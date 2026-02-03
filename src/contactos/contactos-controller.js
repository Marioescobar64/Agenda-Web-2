import Contactos from "./contactos-model.js";

// GET contactos con paginación
export const getContactos = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const contactos = await Contactos.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Contactos.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: contactos,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los contactos',
      error: error.message,
    });
  }
};

// GET contacto por ID
export const getContactoById = async (req, res) => {
  try {
    const { id } = req.params;

    const contacto = await Contactos.findById(id);

    if (!contacto) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: contacto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el contacto',
      error: error.message,
    });
  }
};

// POST crear contacto
export const createContactos = async (req, res) => {
  try {
    const contactoData = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(
        filename.indexOf('contactos/')
      );
      contactoData.photo = `${relativePath}.${extension}`;
    } else {
      // Si no se envía archivo, usar imagen por defecto
      contactoData.photo = 'contactos/Mickey_Mouse_nqrwb0';
    }

    const contacto = new Contactos(contactoData);
    await contacto.save();

    res.status(201).json({
      success: true,
      message: 'Contacto creado exitosamente',
      data: contacto,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el contacto',
      error: error.message,
    });
  }
};

// PUT actualizar contacto
export const updateContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('contactos/')
        ? filename.substring(filename.indexOf('contactos/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const contacto = await Contactos.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!contacto) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contacto actualizado exitosamente',
      data: contacto,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el contacto',
      error: error.message,
    });
  }
};

// PATCH activar / desactivar contacto
export const changeContactoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const contacto = await Contactos.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!contacto) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Contacto ${action} exitosamente`,
      data: contacto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado del contacto',
      error: error.message,
    });
  }
};
getContactoById