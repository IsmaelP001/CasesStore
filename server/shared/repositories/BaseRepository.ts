import { db } from "@/config/database/db";
import { and, eq } from "drizzle-orm";
import {
  IndexColumn,
  PgColumn,
  PgDatabase,
  PgInsertBase,
  PgInsertOnConflictDoUpdateConfig,
  PgInsertValue,
  PgTable,
  PgTableWithColumns,
  PgTransaction,
  PgUpdateSetSource,
  SelectedFieldsFlat,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { TableConfig } from "drizzle-orm/mysql-core";
import {
  type AnyColumn,
  type AnyTable,
  type BuildQueryResult,
  type DBQueryConfig,
  type DrizzleTypeError,
  type Equal,
  type ExtractTablesWithRelations,
  type GetColumnData,
  type KnownKeysOnly,
  type Relation,
  type SQL,
  asc,
  createTableRelationsHelpers,
  desc,
  getOperators,
  getTableColumns,
  sql,
} from "drizzle-orm";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";
import * as schema from "@/config/database/schemes";
import {
  PostgresJsDatabase,
  PostgresJsQueryResultHKT,
} from "drizzle-orm/postgres-js";
import { TRPCError } from "@trpc/server";

type Db = PgDatabase<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type Transaction = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

type TSchema = ExtractTablesWithRelations<typeof schema>;
type QueryConfig<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>;

type OptsQuery<
  Table extends keyof TSchema,
  T extends PgTableWithColumns<any>
> = QueryConfig<Table> & {
  tx?: Transaction;
  filter?: {
    [K in keyof InferInsertModel<T>]?: InferInsertModel<T>[K]; // Mapea la clave a su tipo correspondiente
  };
};

type OptsCreateUpdate<T extends PgTableWithColumns<any>> = {
  onConflictDoNothing?: {
    target?: IndexColumn | IndexColumn[];
  };
  onConflictDoUpdate?: PgInsertOnConflictDoUpdateConfig<
    PgInsertBase<T, PostgresJsQueryResultHKT, undefined, false, never>
  >;
  tx?: Transaction;
};

type QueryResult<
  TableName extends keyof TSchema,
  QBConfig extends QueryConfig<TableName> = {}
> = BuildQueryResult<TSchema, TSchema[TableName], QBConfig>;

export abstract class BaseRepository<
  T extends PgTableWithColumns<any>,
  U extends keyof TSchema
> {
  protected readonly table: T;
  #modelName: keyof TSchema;
  db: any;

  constructor(table: T, tableName: keyof TSchema) {
    this.table = table;
    this.#modelName = tableName;
    this.db = db;
  }

  async create(
    input: InferInsertModel<T> | InferInsertModel<T>[],
    opts?: OptsCreateUpdate<T>
  ): Promise<InferSelectModel<T>[]> {
    const results = (opts?.tx || this.db)
      .insert(this.table)
      .values(input)
      .returning();

    if (opts?.onConflictDoUpdate) {
      results.onConflictDoUpdate(opts.onConflictDoUpdate);
    } else if (opts?.onConflictDoNothing) {
      results.onConflictDoNothing();
    }
    return await results;
  }

  async update({
    filter,
    input,
    opts,
  }: {
    filter: {
      [K in keyof InferInsertModel<T>]?: InferInsertModel<T>[K]; // Mapea la clave a su tipo correspondiente
    };
    input: Partial<InferInsertModel<T>>;
    opts?: OptsCreateUpdate<T>;
  }): Promise<InferSelectModel<T>[]> {
    const conditions = Object.entries(filter).map(([key, value]) => {
      return eq(this.table[key as keyof InferInsertModel<T>], value);
    });

    const whereClause = and(...conditions);

    const updatedElement = await (opts?.tx || this.db)
      .update(this.table)
      .set(input)
      .where(whereClause)
      .returning();

    return  updatedElement;
  }

  async getAll<Opts extends OptsQuery<U, T>>(
    opts?: Opts
  ): Promise<QueryResult<U, Opts>[]> {
    const data = await (opts?.tx || this.db).query[this.#modelName].findMany(
      opts || {}
    );
    return data;
  }

  async getFirst<Opts extends OptsQuery<U, T>>(
    opts?: Opts
  ): Promise<QueryResult<U, Opts>> {
    const conditions = Object.entries(opts?.filter!).map(([key, value]) => {
      return eq(this.table[key as keyof InferInsertModel<T>], value);
    });

    const whereClause = and(...conditions);

    const data = await (opts?.tx || this.db).query[this.#modelName].findFirst({
      where: opts?.filter ? whereClause : undefined,
      columns: opts?.columns,
      with: opts?.with,
      extras: opts?.extras,
    });
    return data;
  }

  async getById<Opts extends OptsQuery<U, T>>(
    id: number | string,
    opts?: Opts
  ): Promise<QueryResult<U, Opts> | null> {
    const item = await (opts?.tx || this.db).query[this.#modelName].findFirst({
      where: eq(schema[this.#modelName].id, id),
      columns: opts?.columns,
      with: opts?.with,
      extras: opts?.extras,
    });
    if (!item) {
      return null;
    }
    return item;
  }

  async findOrCreate(
    id: number | string,
    input: PgInsertValue<T>,
    opts: OptsQuery<U, T>
  ): Promise<InferSelectModel<T> | any> {
    const item = await (opts?.tx || this.db).query[this.#modelName].findFist(
      opts || {}
    );
    if (!item) {
      const results = await db
        .insert(schema[this.#modelName])
        .values(input)
        .returning();
      return results;
    }

    return item;
  }

  async delete(opts: OptsQuery<U, T>): Promise<InferInsertModel<T>[]> {
    const conditions = Object.entries(opts?.filter!).map(([key, value]) => {
      return eq(this.table[key as keyof InferInsertModel<T>], value);
    });

    const whereClause = and(...conditions);

    return await (opts?.tx || this.db)
      .delete(schema[this.#modelName])
      .where(whereClause)
      .returning();
  }

  async transaction<T>(callback: (trx: Transaction) => Promise<T>): Promise<T> {
    const trx = await this.db.transaction(); 

    try {
      const result = await callback(trx); 
      await trx.commit(); 
      return result;
    } catch (error) {
      await trx.rollback(); 
      throw error; 
    }
  }


  
}
