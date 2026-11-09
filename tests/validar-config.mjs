import fs from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(fs.readFileSync(new URL('../config/profesional.json',import.meta.url),'utf8'));
for(const clave of ['nombre','profesion','descripcion','biografia']) assert.equal(typeof data[clave],'string',`Falta campo: ${clave}`);
for(const clave of ['experiencia','formacion','habilidades','proyectos']) assert.ok(Array.isArray(data[clave]),`${clave} debe ser arreglo`);
assert.match(data.color,/^#[0-9a-fA-F]{6}$/,'Color hexadecimal inválido');
assert.ok(data.contacto && typeof data.contacto==='object','Contacto inválido');
console.log('OK: configuración válida y campos básicos presentes.');
