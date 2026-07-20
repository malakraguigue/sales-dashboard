const{z}=require('zod')
const {Category}=require('@prisma/client');
const salesShema=z.object({
  product: z.string().min(1, "Le nom du produit est requis"),
  
  // Transforme "Furniture" en "FURNITURE" avant de vérifier l'enum Prisma
  category: z.string()
    .pipe(z.nativeEnum(Category, { message: "Catégorie inconnue" })),
    
  region: z.string().min(1, "La région est requise"),
  quantity: z.number().int().positive("La quantité doit être supérieure à 0"),
  amount: z.number().positive("Le montant doit être positif"),
  
  // Gère parfaitement le format ISO(ex: "2011-01-14T00:00:00.000Z")
  sale_date: z.string().transform((str) => new Date(str)), 
  
  stock_quantity: z.number().int().nullable().optional()
});
const SalesPayloadSchema = salesShema
module.exports={SalesPayloadSchema};