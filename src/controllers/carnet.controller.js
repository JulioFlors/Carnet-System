import Path from 'path'
import { unlink } from 'fs-extra' 
import Rac from '../models/Rac'
import Staff from '../models/Staff'
import Photo from '../models/Photos'
import Carnet from '../models/Carnets'
import Position from '../models/Positions'
import Department from '../models/Departments'

export async function getData(req, res) {

    try { 
        const { cedula } = req.body;

        // Search matches by cedula
        const staff = await Staff.findOne({ where: {cedula} });

        if (staff) {
 
            const data = await Rac.findOne({

                include: [  { model: Staff }, 
                            { model: Department }, 
                            { model: Position }],
    
                where: { cedula },
    
                attributes: ['cedula', 'first_name', 'last_name'] 
            });
            
            // Search matches by cedula
            const photo = await Photo.findOne({ where: { cedula } });
            
            if (photo) return res.render('carnet/carnet-staff', { data, photo }); 

            return res.render('carnet/carnet-staff', { data }); 
            
        } else {
            req.flash('error_msg', 'No staff found.'); 
            return res.redirect('/carnet/staff/view');  
        } 

    } catch (error) {
        console.log(error); 
        req.flash('error_msg', 'No staff found.');
        return res.redirect('/carnet/staff/view');
    } 
};

export function renderFormCarnet(req, res) {
    res.render('carnet/carnet-staff')
};
 
export async function uploadPhoto(req, res) {
    try {

        // Search matches by cedula
        const photo = await Photo.findOne({ where: { cedula } });

        // if the Photo exist
        if (photo) {
            // we delete from system
            await unlink(Path.resolve('./src/public/' + photo.path));

            // we update photo from data base 
            await Photo.update({
                filename,
                path,
                originalname,
                mimetype,
                size
            }, {
                where: { cedula }
            }); 

            req.flash('success_msg', 'Photo Updated Successfully');
            return res.redirect('/carnet/staff/view');
            
        } else {
            await Photo.create({
                cedula,
                filename,
                path,
                originalname,
                mimetype,
                size
            }); 

            req.flash('success_msg', 'Photo Saved Successfully');
            return res.redirect('/carnet/staff/view'); 
        }  
    } catch (error) {
        console.log(error); 
        req.flash('error_msg', 'Something went wrong when saving the photo');
        return res.redirect('/carnet/staff/view');
    }
};

export async function createCarnet(req, res) {

    try {
        const {
            cedula,
            date_of_expiration
        } = req.body;

        const id_user = req.user.dataValues.id;

        const {
            filename,
            originalname,
            mimetype,
            size
        } = req.file;

        const path = '/img/uploads/' + req.file.filename;

        // Search matches by cedula
        const carnet = await Carnet.findOne({
            where: {
                cedula
            }
        });  
        
        // if the Carnet exist
        if (carnet) {
 
            await Carnet.update({
                date_of_expiration,
                id_user
            }, {
                where: { cedula }
            });

            // Validations to save the photo 
            return uploadPhoto(); 

        } else {
 
            await Carnet.create({
                cedula,
                date_of_expiration,
                id_user
            }, {
                fields: ['cedula', 'date_of_expiration', 'id_user']
            });
            
            // Validations to save the photo 
            return uploadPhoto(); 

        } 
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Could Not Create Carnet');
        res.redirect('/carnet/staff/view');
    }
}
 