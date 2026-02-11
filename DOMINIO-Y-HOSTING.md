# Cómo poner Medanos en internet: hosting y dominio

## Resumen rápido

1. **Hosting** = donde viven los archivos de tu página (muchas opciones **gratis**).
2. **Dominio** = la dirección que la gente escribe (ej. `medanosband.com`). Es **opcional** al inicio; puedes empezar con una URL gratis.

---

## Paso 1: Hosting (gratis)

Elige **una** de estas opciones. Todas son gratis para un sitio estático como el tuyo.

### Opción A: GitHub Pages (recomendada si ya usas GitHub)

Tu código ya está en **github.com/rodriguezjorge/MedanosWeb**.

1. Entra a **https://github.com/rodriguezjorge/MedanosWeb**
2. **Settings** → en el menú izquierdo **Pages**
3. En **"Build and deployment"**:
   - **Source:** Deploy from a branch
   - **Branch:** main | **Folder:** / (root)
4. Clic en **Save**
5. En 1–2 minutos tu sitio estará en:
   - **https://rodriguezjorge.github.io/MedanosWeb/**

Ventaja: cada vez que hagas `git push` al repo, la página se actualiza sola.

---

### Opción B: Netlify (muy fácil, URL personalizable)

1. Entra en **https://www.netlify.com** y crea cuenta (gratis, con GitHub o email).
2. **Add new site** → **Import an existing project**
3. Conecta **GitHub** y elige el repo **MedanosWeb**
4. **Deploy** (no cambies la configuración; está bien por defecto).
5. Te dará una URL como **https://algo-random.netlify.app**
6. En **Domain settings** puedes cambiar el subdominio a algo como **medanosband.netlify.app** (gratis).

Ventaja: puedes conectar un dominio propio más adelante con un clic.

---

### Opción C: Cloudflare Pages

1. **https://pages.cloudflare.com** → Create account / Log in.
2. **Create a project** → **Connect to Git** → GitHub → **MedanosWeb**.
3. Deploy. URL tipo **https://medanosweb.pages.dev**

---

## Paso 2: Dominio propio (opcional, de pago)

Un **dominio** es la dirección que compras (ej. `medanosband.com`). Cuesta unos **10–15 USD/año** según el registrador.

### Dónde comprar el dominio

| Registrador      | Precio aprox.      | Web                    |
|------------------|--------------------|------------------------|
| **Cloudflare**   | ~10 USD/año        | cloudflare.com/products/registrar |
| **Namecheap**    | ~12–15 USD/año     | namecheap.com          |
| **Google (Squarespace)** | ~12 USD/año | domains.google         |
| **Porkbun**      | barato, .com ~10   | porkbun.com            |

Pasos típicos:

1. Entras al registrador y buscas el nombre (ej. `medanosband.com`).
2. Si está libre, lo añades al carrito y pagas (tarjeta o PayPal).
3. Te piden email y datos de contacto; el dominio queda a tu nombre.
4. En el panel del dominio verás opciones como **DNS**, **Nameservers** o **Manage DNS**.

---

## Paso 3: Conectar el dominio al hosting

Cuando ya tengas:
- **Hosting** (por ejemplo Netlify o GitHub Pages), y  
- **Dominio** comprado,

hay que **apuntar** el dominio al hosting.

### Si usas Netlify

1. En Netlify: **Site configuration** → **Domain management** → **Add custom domain**.
2. Escribes tu dominio (ej. `medanosband.com`).
3. Netlify te dice qué registros DNS crear. Vas al panel de tu registrador (donde compraste el dominio) y añades:
   - Un registro **A** o **CNAME** con los valores que Netlify te indica.
4. En 5–60 minutos el dominio empezará a abrir tu sitio. Netlify puede activar **HTTPS** gratis.

### Si usas GitHub Pages

1. En el **repo** → **Settings** → **Pages** → en **Custom domain** pones `medanosband.com`.
2. En el panel de tu registrador (donde compraste el dominio) creas:
   - Registros **A** apuntando a las IP de GitHub:
     - 185.199.108.153  
     - 185.199.109.153  
     - 185.199.110.153  
     - 185.199.111.153  
   - O un **CNAME** con valor `rodriguezjorge.github.io` (para un subdominio tipo `www.medanosband.com`).
3. GitHub te deja activar HTTPS cuando detecte bien el dominio.

### Si compraste el dominio en Cloudflare

1. Añades el sitio en Cloudflare (te pide cambiar los nameservers en tu registrador).
2. En **DNS** creas un registro **CNAME**: nombre `@` o `www`, destino la URL que te da Netlify o GitHub (ej. `medanosweb.netlify.app` o `rodriguezjorge.github.io`).
3. Cloudflare da HTTPS y CDN incluidos.

---

## Orden recomendado

1. **Ahora (gratis):** Publicar con **GitHub Pages** o **Netlify** y usar la URL que te dan (ej. `rodriguezjorge.github.io/MedanosWeb` o `medanosband.netlify.app`).
2. **Cuando quieras:** Comprar el dominio en **Cloudflare** o **Namecheap** y conectarlo al mismo hosting en 5 minutos.

Así tienes la banda en internet ya y el dominio lo añades cuando te decidas.
