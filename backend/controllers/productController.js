import AirtableBase from "../database/airtableConfig.js";
import { v4 as uuidv4 } from 'uuid';

export const getProducts = async (req, res) => {
    try {
        
        const products = await AirtableBase('Products').select().firstPage();

        // Format records
        const formattedProducts = products.map(product => ({
            id: product.id,
            ...product.fields
        }));

        return res.status(200).json(formattedProducts);

    } 
    catch (error) {

        console.error(error);

        return res.status(500).json({
             error: "Failed to fetch products" 
        });
    }
};


export const createProduct = async (req, res) => {

    const { productName, description, price, imgUrl } = req.body;

    const ownerId = req.airtableId; 
    const pid = uuidv4();

    //console.log(ownerId);

    if (!productName || !description || !price || !imgUrl || !ownerId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
      
        const result = await AirtableBase('Products').create([
            {
                fields: {
                    pid,
                    productName,
                    description,
                    price,
                    imgUrl,
                    owner :[ ownerId],
                }
            }
        ]);

        return res.status(201).json({
            msg: "Product created successfully",
            product: { id: result[0].id, pid,...result[0].fields }
        });

    } catch (error) {

        console.error("failed to create product", error);
        

        return res.status(500).json({
             error: "Failed to create product" 
        });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, description, price, imgUrl } = req.body;
    const owner = req.userId;

    try {
       
        const product = await AirtableBase('Products').find(id);

        if (!product || product.fields.owner !== owner) {
            return res.status(403).json({ message: "Unauthorized or product not found" });
        }

     
        const updatedProduct = await AirtableBase('Products').update([
            {
                id,
                fields: { productName, description, price, imgUrl }
            }
        ]);

        return res.status(200).json({
            msg: "Product updated successfully",
            product: { id: updatedProduct[0].id, ...updatedProduct[0].fields }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
             error: "Failed to update product" 
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const owner = req.airtableId


    try {
       
        const product = await AirtableBase('Products').find(id);


        if (!product || product.fields.owner[0] !== owner) {
            return res.status(403).json({ message: "Unauthorized or product not found" });
        }

        
        await AirtableBase('Products').destroy(id);

        return res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {

        console.error(error);
        
        return res.status(500).json({ error: "Failed to delete product" });
    }
};
