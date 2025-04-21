import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Head ,useForm, usePage, Link} from '@inertiajs/react';

const EmpresaForm = ({ empresa }) => {
    const [formData, setFormData] = useState({
        emp_nombre: empresa.emp_nombre || '',
        emp_direccion: empresa.emp_direccion || '',
        emp_ciudad: empresa.emp_ciudad || '',
        emp_tipodoc: empresa.emp_tipodoc || '',                        
        emp_nrodoc:empresa.emp_nrodoc ||'',
        emp_telefono:empresa.emp_telefono ||'',                         
        emp_email:empresa.emp_email ||'',                         
        emp_logo:empresa.emp_logo || '',
        emp_fchini:empresa.emp_fchini ||'',                         
        emp_estado:empresa.emp_estado ||'',
    });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Si es un archivo, lo guardas en el estado como un objeto File
        if (name === "emp_logo") {
            setFormData({ ...formData, emp_logo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     Inertia.put(`/parametro/${empresa.id}`, formData); // Envía los datos al controlador
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("emp_nombre", formData.emp_nombre);
        formDataToSend.append("emp_logo", formData.emp_logo); // Archivo

        Inertia.post(`/parametro/${empresa.id}/update`, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="emp_nombre">Nombre:</label>
            <input
                type="text"
                id="emp_nombre"
                name="emp_nombre"
                value={formData.emp_nombre}
                onChange={handleChange}
            />
            <br />

            <label htmlFor="emp_direccion">Dirección:</label>
            <input
                type="text"
                id="emp_direccion"
                name="emp_direccion"
                value={formData.emp_direccion}
                onChange={handleChange}
            />
            <br />

            <label htmlFor="emp_ciudad">Ciudad:</label>
            <input
                type="text"
                id="emp_ciudad"
                name="emp_ciudad"
                value={formData.emp_ciudad}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="emp_ciudad">emp_tipodoc:</label>
            <input
                type="text"
                id="emp_tipodoc"
                name="emp_tipodoc"
                value={formData.emp_tipodoc}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="emp_nrodoc">emp_nrodoc:</label>
            <input
                type="text"
                id="emp_nrodoc"
                name="emp_nrodoc"
                value={formData.emp_nrodoc}
                onChange={handleChange}
            />
            <br />

            <label htmlFor="emp_telefono">emp_telefono:</label>
            <input
                type="text"
                id="emp_telefono"
                name="emp_telefono"
                value={formData.emp_telefono}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="emp_email">emp_email:</label>
            <input
                type="text"
                id="emp_email"
                name="emp_email"
                value={formData.emp_email}
                onChange={handleChange}
            />
            <br />

            <label htmlFor="emp_logo">emp_logo:</label>
            <input
                type="file"
                id="emp_logo"
                name="emp_logo"
                value={formData.emp_logo}
                onChange={handleChange}
            />
<img src={`/logos/${empresa.emp_logo}`} alt="Logo Empresa" className="w-30 h-30" />

            <br />
            <label htmlFor="emp_email">emp_fchini:</label>
            <input
                type="file"
                id="emp_fchini"
                name="emp_fchini"
                value={formData.emp_fchini}
                onChange={handleChange}
            /> 



            <br />
            <label htmlFor="emp_estado">emp_estado:</label>
            <input
                type="text"
                id="emp_estado"
                name="emp_estado"
                value={formData.emp_estado}
                onChange={handleChange}
            />
            <br />
  

            <button type="submit">Guardar cambios</button>
        </form>
    );
};

export default EmpresaForm;
