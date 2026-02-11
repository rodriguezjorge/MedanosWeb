# Pasos para conectar medanosofficial.com a GitHub Pages

Sigue estos pasos **en orden**.

---

## Paso 1: Entra donde gestionas el dominio

Abre el sitio donde compraste **medanosofficial.com** (Cloudflare, Namecheap, Google Domains, Porkbun, etc.) e inicia sesión.

---

## Paso 2: Ve a la sección DNS

Busca en el menú algo como **DNS**, **Manage DNS**, **DNS Records** o **Zona DNS** y ábrelo.

---

## Paso 3: Borra registros que molesten

- Si tienes algún **CNAME** o **A** para `@` o para `medanosofficial.com` que no sean los de GitHub, **elimínalo** (o anótalos por si acaso).
- Si no estás seguro, sigue al paso 4; lo importante es que al final queden solo los registros que vamos a crear.

---

## Paso 4: Crea los 4 registros A (para medanosofficial.com)

Crea **4 registros**, uno por cada fila de esta tabla:

| Nº | Tipo | Nombre / Host | Valor / Apuntar a / Target |
|----|------|----------------|----------------------------|
| 1  | **A**  | `@` (o vacío) | `185.199.108.153` |
| 2  | **A**  | `@` (o vacío) | `185.199.109.153` |
| 3  | **A**  | `@` (o vacío) | `185.199.110.153` |
| 4  | **A**  | `@` (o vacío) | `185.199.111.153` |

- **Nombre/Host:** según el panel puede ser `@`, vacío o `medanosofficial.com` (para el dominio raíz).
- **Valor:** la IP, tal cual, sin `http://` ni nada más.

Guarda los cambios.

---

## Paso 5: (Opcional) Si también quieres www.medanosofficial.com

Añade **un** registro más:

| Tipo   | Nombre / Host | Valor / Apuntar a        |
|--------|----------------|--------------------------|
| **CNAME** | `www`        | `rodriguezjorge.github.io` |

Sin `https://`, sin `/MedanosWeb`, sin barra al final. Solo: `rodriguezjorge.github.io`.

---

## Paso 6: Si usas Cloudflare

- En la lista de registros DNS, los que acabas de crear (A y CNAME) no deben estar **Proxied** (nube naranja).
- Pásalos a **DNS only** (gris). Suele ser un clic en la nube.
- Guarda.

---

## Paso 7: Espera unos minutos

Los DNS pueden tardar 5–30 minutos (a veces hasta 24 h). No sigas a GitHub hasta haber guardado bien los registros del paso 4 (y 5 si aplica).

---

## Paso 8: Configura el dominio en GitHub

1. Abre: **https://github.com/rodriguezjorge/MedanosWeb**
2. Clic en **Settings** (Configuración).
3. En el menú izquierdo, **Pages**.
4. En **Custom domain** escribe: `medanosofficial.com` (sin `https://`, sin barra final).
5. Clic en **Save**.

---

## Paso 9: Comprueba si hay error

- Si **no** sale error: en unos minutos podrás marcar **Enforce HTTPS** en la misma página. Listo.
- Si **sí** sale "improperly configured" o "InvalidDNSError":
  1. En **Custom domain** clic en **Remove**.
  2. Espera 2–3 minutos.
  3. Vuelve a poner `medanosofficial.com` y **Save**.
  4. Verifica en tu proveedor DNS que los 4 registros A estén bien y, si usas Cloudflare, en **DNS only**.

---

## Paso 10: Verificar DNS desde tu PC (opcional)

Abre **PowerShell** y ejecuta:

```powershell
Resolve-DnsName medanosofficial.com -Type A
```

Deberías ver las 4 IP de GitHub. Si no aparece nada o salen otras IP, los DNS aún no están bien o no han propagado; revisa los pasos 4 y 6.

---

## Resumen rápido

1. DNS del dominio → 4 registros **A** con las 4 IP de GitHub para `@`.
2. (Opcional) 1 registro **CNAME** `www` → `rodriguezjorge.github.io`.
3. Si usas Cloudflare → **DNS only** (gris).
4. GitHub → Settings → Pages → Custom domain: `medanosofficial.com` → Save.
5. Si sigue el error → Remove dominio, esperar, volver a añadir y revisar DNS.
