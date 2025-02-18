import {
    desc,
    eq,
    is,
    or,
    SQL,
    sql,
    type AnyColumn,
    type InferSelectModel,
  } from "drizzle-orm";
  import { PgTimestampString, type SelectedFields } from "drizzle-orm/pg-core";
  import { type SelectResultFields } from "../../node_modules//drizzle-orm/query-builders/select.types";
  
  export  function distinctOn<Column extends AnyColumn>(column: Column) {
      return sql<Column["_"]["data"]>`distinct on (${column}) ${column}`;
    }
  
  
    export function jsonBuildObject<T extends SelectedFields>(shape: T) {
      const chunks: SQL[] = [];
  
      Object.entries(shape).forEach(([key, value]) => {
        if (chunks.length > 0) {
          chunks.push(sql.raw(`,`));
        }
  
        chunks.push(sql.raw(`'${key}',`));
  
        // json_build_object formats to ISO 8601 ...
        if (is(value, PgTimestampString)) {
          chunks.push(sql`timezone('UTC', ${value})`);
        } else {
          chunks.push(sql`${value}`);
        }
      });
  
      return sql<SelectResultFields<T>>`coalesce(json_build_object(${sql.join(
        chunks
      )}), '{}')`;
    }
  
    export function jsonAggBuildObject<T extends SelectedFields>(shape: T) {
      return sql<SelectResultFields<T>[]>`coalesce(jsonb_agg(${jsonBuildObject(
        shape
      )}), '${sql`[]`}')`;
    }
  
  
  