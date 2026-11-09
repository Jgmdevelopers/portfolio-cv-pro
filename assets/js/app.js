'use strict';
const $ = (selector) => document.querySelector(selector);
const texto = (selector, value) => { const el = $(selector); if(el) el.textContent = value ?? ''; };
const elemento = (tag, className, content) => {const el=document.createElement(tag);if(className)el.className=className;if(content!==undefined)el.textContent=String(content);return el;};
const URL_SEGURAS = new Set(['https:', 'http:', 'mailto:']);
function enlaceSeguro(valor){try{const url=new URL(valor,window.location.href);return URL_SEGURAS.has(url.protocol)?url.href:null;}catch{return null;}}
function lista(selector, items, render){const root=$(selector);root.replaceChildren();(Array.isArray(items)?items:[]).forEach(item=>root.append(render(item)));}
function renderizar(datos){
  document.title=`${datos.nombre || 'Portfolio'} | ${datos.profesion || 'Profesional'}`;
  $('meta[name="description"]').content=datos.descripcion||'Portfolio profesional';
  if(/^#[0-9a-fA-F]{6}$/.test(datos.color||''))document.documentElement.style.setProperty('--accent',datos.color);
  texto('#marca',datos.nombre||'Portfolio');texto('#etiqueta',datos.etiqueta);texto('#nombre',datos.nombre);texto('#profesion',datos.profesion);texto('#descripcion',datos.descripcion);
  texto('#ubicacion',datos.ubicacion);texto('#biografia',datos.biografia);texto('#mensaje-contacto',datos.mensaje_contacto);texto('#pie-nombre',datos.nombre);texto('#iniciales',datos.iniciales||'CV');
  if(datos.foto){const src=enlaceSeguro(datos.foto);if(src){const img=document.createElement('img');img.src=src;img.alt=`Fotografía de ${datos.nombre}`;img.loading='eager';$('#retrato').replaceChildren(img);}}
  if(datos.cv){const cv=enlaceSeguro(datos.cv);if(cv)$('#enlace-cv').href=cv;else $('#enlace-cv').hidden=true;}else $('#enlace-cv').hidden=true;
  lista('#lista-experiencia',datos.experiencia,item=>{const art=elemento('article','timeline-item');art.append(elemento('span','period',item.periodo));const body=elemento('div');body.append(elemento('h3','',item.cargo),elemento('span','meta',item.organizacion),elemento('p','',item.descripcion));art.append(body);return art;});
  lista('#lista-formacion',datos.formacion,item=>{const art=elemento('article','card');art.append(elemento('small','',item.tipo),elemento('h3','',item.titulo),elemento('p','',item.institucion));return art;});
  lista('#lista-habilidades',datos.habilidades,item=>elemento('span','chip',item));
  lista('#lista-proyectos',datos.proyectos,item=>{const art=elemento('article','card');art.append(elemento('small','',item.categoria),elemento('h3','',item.titulo),elemento('p','',item.descripcion));if(item.url){const href=enlaceSeguro(item.url);if(href){const a=elemento('a','', 'Ver proyecto ↗');a.href=href;a.target='_blank';a.rel='noopener noreferrer';art.append(a);}}return art;});
  const contacto=datos.contacto||{};const formas=[['Enviar email',contacto.email?`mailto:${contacto.email}`:null],['WhatsApp',/^\d{8,15}$/.test(contacto.whatsapp||'')?`https://wa.me/${contacto.whatsapp}`:null],['LinkedIn',contacto.linkedin],['Sitio web',contacto.sitio]];
  const root=$('#lista-contacto');root.replaceChildren();formas.forEach(([titulo,url])=>{const href=url?enlaceSeguro(url):null;if(!href)return;const a=elemento('a','',`${titulo} ↗`);a.href=href;if(!href.startsWith('mailto:')){a.target='_blank';a.rel='noopener noreferrer';}root.append(a);});
  const opciones=datos.secciones||{};for(const id of ['experiencia','formacion','habilidades','proyectos']){$(`#${id}`).hidden=opciones[id]===false || !Array.isArray(datos[id==='proyectos'?'proyectos':id]) || datos[id].length===0;}
  $('a[href="#contacto"]').addEventListener('click',()=>{});
}
async function iniciar(){texto('#anio',new Date().getFullYear());const temaGuardado=localStorage.getItem('portfolio-tema');const tema=temaGuardado==='dark'||temaGuardado==='light'?temaGuardado:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=tema;$('#cambiar-tema').textContent=tema==='dark'?'☀':'☾';$('#cambiar-tema').addEventListener('click',()=>{const nuevo=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=nuevo;localStorage.setItem('portfolio-tema',nuevo);$('#cambiar-tema').textContent=nuevo==='dark'?'☀':'☾';});$('#menu-toggle').addEventListener('click',()=>{const abierto=$('#navegacion').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(abierto));});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{$('#navegacion').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}));try{const respuesta=await fetch('config/profesional.json',{cache:'no-cache'});if(!respuesta.ok)throw Error(`HTTP ${respuesta.status}`);renderizar(await respuesta.json());}catch(err){console.error('Error cargando portfolio:',err);$('#error').hidden=false;}}
iniciar();
