// importar las dependecias

import { Router } from "express";
import { getContactos, createContactos, getContactoById, updateContacto, changeContactoStatus, } from "./contactos-controller.js";
import { validateCreateContacto } from "../../middlewares/contactos-validation.js";

import { uploadContactoImage } from "../../middlewares/file-update.js";

const router = Router();

// Rutas Get
router.get('/', getContactos);
router.get('/:id', getContactoById);

// rutas Post
router.post('/', uploadContactoImage.single('photo'), validateCreateContacto, createContactos);


// Rutas Put
router.put('/:id',uploadContactoImage.single('photo'), updateContacto);

// Rutas DELETE/PATCH esto lo que hace es Activar o desactivar al contacto sin borrarlo

router.patch('/:id/activate', changeContactoStatus);
router.patch('/:id/deactivate', changeContactoStatus);

export default router;
