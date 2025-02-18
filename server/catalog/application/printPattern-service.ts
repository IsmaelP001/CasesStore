import { PrintPattern } from "../domain/printPattern-model";
import { IPrintPatternRepository } from "../domain/repositories";
import { defaultPrintPatternRepository } from "../infrastructure/printPattern-repository";
import { IPrintPatternService } from "./service.definitions";

export class DefaultPrintPatternServiceImpl implements IPrintPatternService{
  constructor(private printPatternRepository: IPrintPatternRepository) {}

  async getAllPrintPattern(): Promise<PrintPattern[]> {
    return this.printPatternRepository.getAllPrintPattern()
  }
}

export const defaultprintPatternService = new  DefaultPrintPatternServiceImpl(
   defaultPrintPatternRepository
);
