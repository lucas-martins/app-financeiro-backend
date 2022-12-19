import Category from "../models/Category";

class CategoryController {

    async retrieveCategories(req, res) {

        const {userId} = req.params

        const categories = await 
        Category.find({$or:[{userId: null},{userId}]})

        return res.json(categories)
    }
}

export default new CategoryController()