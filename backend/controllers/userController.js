import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import  AirtableBase  from "../database/airtableConfig.js"

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await AirtableBase('Users')
            .select({ filterByFormula: `{email} = "${email}"` })
            .firstPage();


        if(users.length === 0) {
            return res.status(404).json({
                 message: 'User not found.' 
                });
        }


        const user = users[0].fields;

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return res.status(401).json({
                 message: 'Invalid password.' 
                });
        }


        const token = jwt.sign({
             email: user.id }, process.env.SECRET, { expiresIn: '1h' });


        return res.status(200).json({
             message: 'Login successful!', token 
            });
    } 

    catch(error) {

        return res.status(500).json({ 
            error: 'Internal Server Error' 
        });

    }

};


export const userSignup = async (req, res) =>{
    const { name, email, password} = req.body;
   

	if (!name || !email || !password) {
		return res.json({
			message: "Enter All Values!",
		});
	}

    try{
        
        const existingUsers = await AirtableBase('Users').select({ 
            filterByFormula: `{email} = "${email}"`
            }).firstPage();


        if(existingUsers.length > 0) {
              return res.status(400).json({ message: 'Email already registered.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        
        const result = await AirtableBase('Users').create([{
             fields: { 
                email,
                password: hashedPassword,
                username : name
            }}]);
        

        const userId = result[0].id
        
        const token = jwt.sign({ userId: userId }, process.env.SECRET, { expiresIn: '1h' });
    
        console.log("token is", token);   

         return res.status(201).json({
            message : "User Creation Successful !",
            token : token
         })   

    }
    catch(error){

        return res.status(500).json({
             error: 'Internal Server Error'
        });

    }
}