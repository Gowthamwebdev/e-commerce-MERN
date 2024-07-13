import { Product } from '../models/ProductsModel.js';

//Add new Product 

export const createProduct = async (req, res) =>{
    try {
        // Check user role

        // if(req.user.role != "admin"){
        //     return res.status(403).json({ message: 'Unauthorized Access' });
        // }
        console.log(req.file);
        const {title, description, category, price, stock} = req.body;
        const image = req.file;

        if(!image){
            return res.status(403).json({ message: 'Pleae select the image' });
        }

        //store to Database

        const product = await Product.create({
            title,
            description,
            category,
            price,
            stock,
            image: image?.path,
        });
        res.status(201).json({
            message:"Product created successfully",product
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}