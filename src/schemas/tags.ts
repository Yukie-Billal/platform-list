import { number, object, Schema, string } from "yup";
import { TablesInsert, TablesUpdate } from "../types/database.types";

type TagUpdateValidation = Omit<TablesInsert<"tags">, "id"> & {
   id: number
}

export const createTagsSchemaValidation: Schema<TablesInsert<"tags">> = object().shape({
  name: string().required().trim().nonNullable().min(1).matches(/\S/, "Tidak boleh hanya spasi"),
  tag_id: number().required().nullable(),
})

export const updateTagsSchemaValidation: Schema<TagUpdateValidation> = object().shape({
   id: number().required(),
   name: string().required().trim().nonNullable().min(1).matches(/\S/, "Tidak boleh hanya spasi"),
   tag_id: number().optional().nullable(),
})