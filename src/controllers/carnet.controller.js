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

                include: [  { model: Staff, 
                              include: [ { model: Carnet } ]
                            }, 
                            { model: Department }, 
                            { model: Position }
                         ],
    
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

export async function getDataAGAIN(req, res, cedula) {

    try {   
            const data = await Rac.findOne({

            include: [  { model: Staff, 
                          include: [ { model: Carnet } ]
                        }, 
                        { model: Department }, 
                        { model: Position }
                     ],
              where: { cedula },
              attributes: ['cedula', 'first_name', 'last_name'] 
            });
            
            // Search matches by cedula
            const photo = await Photo.findOne({ where: { cedula } });
            
            if (photo) return res.render('carnet/carnet-staff', { data, photo }); 

            return res.render('carnet/carnet-staff', { data });        
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
    
    const { cedula } = req.body;

    const {
        filename,
        originalname,
        mimetype,
        size
    } = req.file;

    const path = '/img/uploads/' + req.file.filename;

    try { 

         // Search matches by cedula
         const staff = await Staff.findOne({ where: {cedula} });

         if (staff) {

            // Search matches by cedula
            const photo = await Photo.findOne({ where: { cedula } });

            // if the Photo exist
            if (photo) {
    
                // we update photo from data base 
                const photoUpdate = await Photo.update({
                    filename,
                    path,
                    originalname,
                    mimetype,
                    size
                }, {
                    where: { cedula }
                }); 

                // if the photo was updated
                if (photoUpdate) {
                    // we delete from system
                    await unlink(Path.resolve('./src/public/' + photo.path));

                    req.flash('success_msg', 'Photo Updated Successfully');
                } else {
                    req.flash('success_msg', 'Photo Could Not Be Updated');
                } 
    
                // Get and Validation of the data
                return getDataAGAIN(req, res, cedula); 
                
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
                
                // Get and Validation of the data
                return getDataAGAIN(req, res, cedula); 
            }  
         } else {
            // we delete from system
            await unlink(Path.resolve('./src/public/' + path)); 
            
            req.flash('error_msg', 'No staff found.');
            return res.redirect('/carnet/staff/view');
         }

    } catch (error) {  
        // we delete from system
        await unlink(Path.resolve('./src/public/' + path));

        console.log(error); 
        req.flash('error_msg', 'Something went wrong when saving the photo ');

        // Get and Validation of the data
        return getData(req, res); 
    }
};

export async function createCarnet(req, res) {

    const {
        cedula,
        date_of_expiration,
        department,
        position
    } = req.body;
  
    const id_user = req.user.dataValues.id;    
    const errors = [];

    console.log(id_user);
    console.log(cedula);
    console.log(date_of_expiration);
    console.log(department);
    console.log(position);

    try {  
  
         // Search matches by Department
         const Dpto = await Department.findOne({ where: {description: department} });

         if (!Dpto){ 
            errors.push({ text: 'Invalid Department.' }); 
            return res.redirect('/carnet/staff/view');
         }

         // Search matches by Position
         const Cargo = await Position.findOne({ where: {description: position} });

         if (!Cargo){ 
            errors.push({ text: 'Invalid Position.' }); 
            return res.redirect('/carnet/staff/view');
         } 

         if (errors.length > 0) {
            res.render('session/signup', {
                errors,
                username,
                password
            })
        } else {

            
        }
        
         // Search matches by cedula
         const staff = await Staff.findOne({ where: {cedula} });

         if (staff) {
            // Search matches by cedula
            const carnet = await Carnet.findOne({ where: { cedula } });  
            
            // if the Carnet exist
            if (carnet) {
    
                const carnetUpdate = await Carnet.update({
                    date_of_expiration,
                    id_user
                }, {
                    where: { cedula }
                });
    
                if (carnetUpdate){
                    // Get and Validation of the data
                    req.flash('success_msg', 'Carnet Update Successfuly');
                    console.log('Carnet Update Successfuly');
                    return getDataAGAIN(req, res, cedula);
                } else {  
                    req.flash('error_msg', 'Could Not Update Carnet');
                    console.log('Could Not Update Carnet');
                    return res.redirect('/carnet/staff/view');
                } 
            } else {
    
                const carnetCreate = await Carnet.create({
                    cedula,
                    date_of_expiration,
                    id_user
                }, {
                    fields: ['cedula', 'date_of_expiration', 'id_user']
                });
                
                if (carnetCreate){
                    // Get and Validation of the data
                    req.flash('success_msg', 'Carnet Create Successfuly');
                    console.log('Carnet Create Successfuly');
                    return getDataAGAIN(req, res, cedula); 
                } else {  
                    req.flash('error_msg', 'Could Not Create Carnet');
                    console.log('Could Not Create Carnet');
                    return res.redirect('/carnet/staff/view');
                }  
            } 
         } else {
            req.flash('error_msg', 'Enter a valid cedula');
            console.log('Enter a valid cedula');
            return res.redirect('/carnet/staff/view');
         }  
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Could Not Create Carnet');
        console.log('Could Not Create Carnet');
        return res.redirect('/carnet/staff/view');
    }
}
