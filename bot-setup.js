const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');

const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.GUILD_ID;

if (!token || !guildId) {
    console.error("Faltan las variables de entorno DISCORD_BOT_TOKEN o GUILD_ID.");
    process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const structure = {
    categories: [
        {
            name: "✦・INICIO",
            channels: [
                { name: "✦・bienvenida", topic: "Saludos a los nuevos miembros y primeros pasos en la comunidad." },
                { name: "✦・reglas", topic: "Normas de convivencia, sanciones y conducta en el servidor." },
                { name: "✦・anuncios", topic: "Novedades oficiales, mantenimientos y noticias del GDPS." },
                { name: "✦・info", topic: "Links de descarga, estado del servidor y datos del GDPS." },
                { name: "✦・roles", topic: "Auto-asignación de roles y preferencias de notificaciones." }
            ]
        },
        {
            name: "✧・COMUNIDAD",
            channels: [
                { name: "✧・general", topic: "Chat principal para hablar de Geometry Dash y el GDPS." },
                { name: "✧・medias", topic: "Capturas, clips, videos e imágenes de la comunidad." },
                { name: "✧・offtopic", topic: "Charlas casuales sobre otros temas fuera de GDPS." }
            ]
        },
        {
            name: "⬡・CREACIÓN",
            channels: [
                { name: "⬡・showcase", topic: "Muestra tus niveles, avances de layouts y decoraciones." },
                { name: "⬡・colabs", topic: "Búsqueda de creadores, decoradores y layoutmakers." },
                { name: "⬡・feedback", topic: "Pide opinión constructiva para mejorar tu nivel." },
                { name: "⬡・editor", topic: "Consejos, dudas de triggers y ayuda con el editor de GD." },
                { name: "⬡・recursos", topic: "Texturas, SFX, canciones y assets para creadores." }
            ]
        },
        {
            name: "◈・RATES Y TESTS",
            channels: [
                { name: "◈・playtest", topic: "Envía tu nivel para que la comunidad pruebe el gameplay." },
                { name: "◈・solicitar-rate", topic: "Formulario e hilos para pedir Rate o Featured en el GDPS." },
                { name: "◈・decisiones", topic: "Anuncios oficiales de niveles enviados, aprobados o con Rate." }
            ]
        },
        {
            name: "⟡・SOPORTE",
            channels: [
                { name: "⟡・ayuda", topic: "Guías rápidas para solucionar errores comunes de conexión o juego." },
                { name: "⟡・tickets", topic: "Abre un ticket privado para atención directa del Staff." },
                { name: "⟡・estado", topic: "Monitoreo en tiempo real del estado de los servidores y base de datos." }
            ]
        },
        {
            name: "⭒・EVENTOS",
            channels: [
                { name: "⭒・info-eventos", topic: "Anuncios de Level Jams, concursos y desafíos activos." },
                { name: "⭒・inscripciones", topic: "Registro de participantes y equipos para eventos." },
                { name: "⭒・ganadores", topic: "Resultados oficiales y premiación de concursos." }
            ]
        },
        {
            name: "⚙・STAFF",
            private: true,
            channels: [
                { name: "⚙・chat-staff", topic: "Espacio de coordinación general entre Moderadores y Devs." },
                { name: "⚙・logs", topic: "Registro de moderación, sanciones e incidentes." },
                { name: "⚙・devs", topic: "Discusión técnica de la base de datos, servidor e infraestructura." },
                { name: "⚙・reviewers", topic: "Panel interno de discusión sobre los niveles para Rate." }
            ]
        }
    ]
};

client.once('ready', async () => {
    console.log(`Conectado como ${client.user.tag}`);
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        console.error("Servidor no encontrado.");
        process.exit(1);
    }

    try {
        console.log("Eliminando canales viejos para resetear la estructura...");
        const existingChannels = await guild.channels.fetch();
        for (const [id, channel] of existingChannels) {
            await channel.delete('Limpieza para aplicar nueva estructura').catch(() => {});
        }

        console.log("Creando nuevas categorías y canales optimizados...");
        for (const catData of structure.categories) {
            const overwrites = [];
            if (catData.private) {
                overwrites.push({
                    id: guild.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                });
            }

            const category = await guild.channels.create({
                name: catData.name,
                type: 4,
                permissionOverwrites: overwrites
            });

            for (const chan of catData.channels) {
                await guild.channels.create({
                    name: chan.name,
                    topic: chan.topic,
                    type: 0,
                    parent: category.id
                });
            }
        }

        console.log("¡Estructura actualizada con éxito!");
        process.exit(0);
    } catch (error) {
        console.error("Error al desplegar la estructura:", error);
        process.exit(1);
    }
});

client.login(token);
