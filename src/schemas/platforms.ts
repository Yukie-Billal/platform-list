import { boolean, number, object, Schema, string } from "yup";
import { TablesInsert, TablesUpdate } from "../types/database.types";

type UpdateSchema = Omit<TablesUpdate<"platforms">, "id"> & {
   id: string
}

export const createPlatfromSchemaValidation: Schema<TablesInsert<"platforms">> = object().shape({
   main_feature: string().required().nonNullable(),
   name: string().required().nonNullable(),
   type: string().required().nonNullable(),

   active: boolean().required(),
   description: string().nullable().optional(),

   design_rating: number().nullable().optional(),
   mobile_app: string().nullable().default(null),
   web_url: string().nullable().default(null),
});

export const updatePlatfromSchemaValidation: Schema<UpdateSchema> = object().shape({
   id: string().required(),
   name: string().required().nonNullable(),
   main_feature: string().required().nonNullable(),
   type: string().required().nonNullable(),

   active: boolean().required(),
   description: string().nullable().optional(),

   design_rating: number().nullable().optional(),
   mobile_app: string().nullable().default(null),
   web_url: string().nullable().default(null),
})

export const deletePlatformSchemaValidation: Schema<{id: number, force?: boolean | null | undefined}> = object().shape({
   id: number().required(),
   force: boolean().nullable().optional()
})