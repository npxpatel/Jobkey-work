import AirtableBase from "../database/airtableConfig.js";
import { v4 as uuidv4 } from 'uuid';

export const createOrder = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.airtableId;

    const quantityString = quantity.toString();

   
    if (!productId || !quantity) {
        return res.status(400).json({
            msg: "Product ID and quantity are required"
        });
    }

    try {

        const productRecord = await AirtableBase('Products').find(productId);

        if (!productRecord) {
            return res.status(404).json({
                msg: "Product not found"
            });
        }

        const product = productRecord.fields;
        const price = product.price;
        const totalPrice = price * quantity;

      
    
        const orderId = uuidv4();

      
        await AirtableBase('Orders').create([
            {
                fields: {
                    orderId,
                    buyerId: [userId], 
                    productId: [productId], 
                    totalPrice,
                    status: "Pending",
                    quantity : quantityString
                }
            }
        ]);

       
        res.status(201).json({
            msg: "Order created successfully",
            orderId
        });

    } catch (error) {
        console.error(error);

    
        if (error.statusCode === 404) {
            return res.status(404).json({ msg: "Product not found in Airtable" });
        }

        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};



export const deleteOrder = async(req, res) =>{
    const orderId = req.params.id;    // a uuid for as order, not the airtable id
    const owner = req.airtableId;


    if(!orderId){
        return res.status(400).json({
            msg : "Order ID is required"
        })
    }


    try{

        const orders = await AirtableBase('Orders')
            .select({ filterByFormula: `{orderId} = "${orderId}"` })
            .firstPage();


        if (orders.length === 0) {
            return res.status(404).json({
                msg: "Order not found",
            });
        }   
        
        
        const order = orders[0].fields;

        console.log("Order fields:", order);


        if (order.buyerId[0] !== owner) {
                return res.status(403).json({
                     message: "Unauthorized to cancel the order" 
                    });
        }  

        const airtableId = orders[0].id;

        await AirtableBase('Orders').destroy([airtableId]);

        return res.status(200).json({
            msg : "Order deleted successfully"
        })

    }
    catch(error){

        console.error(error);
        return res.status(500).json({
            msg : "Internal Server Error"
        })
    }
}


export const getOrders = async (req, res) => {
    const userId = req.userId

    try {

        const orders = await AirtableBase('Orders')
            .select({
                filterByFormula: `{buyerId} = "${userId}"`, 
            })
            .all();



        const formattedOrders = orders.map((order) => ({
            orderId: order.fields.orderId,
            productId: order.fields.productId,
            quantity: order.fields.quantity,
            totalPrice: order.fields.totalPrice,
            status: order.fields.status,
            createdAt: order.fields.createdAt,
        }));


        return res.status(200).json({
            msg: "Orders retrieved successfully.",
            orders: formattedOrders,
        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error",
        });

    }
};
