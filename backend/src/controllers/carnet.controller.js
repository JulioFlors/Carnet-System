import Carnet from '../models/Carnets';

export async function getCarnets(req, res) {

    await Carnet.findAll().then((result) => {
        res.json({
            data: result
        })
    }).catch((err) => {
        console.log(err);
    })
};