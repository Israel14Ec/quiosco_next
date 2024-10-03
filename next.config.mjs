/** @type {import('next').NextConfig} */
const nextConfig = {
    //configuro los cors para cloudinary
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
        // Configuración de TypeScript
        typescript: {
            // !! WARN !!
            // Permitir que los builds en producción continúen incluso si hay errores de tipo.
            // !! WARN !!
            ignoreBuildErrors: true,
        },
};

export default nextConfig;
