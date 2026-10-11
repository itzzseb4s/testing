const { Client, GatewayIntentBits, REST, Routes, PermissionFlagsBits } = require('discord.js');

const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.GUILD_ID;

if (!token || !guildId) {
    console.error("Faltan las variables de entorno DISCORD_BOT_TOKEN o GUILD_ID.");
    process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const structure = {
    roles: [
        { name: "✦ Fundador", color: 0x17191F, permissions: [] },
        { name: "⬡ Staff Técnico / Dev", color: 0x343844, permissions: [] },
        { name: "✧ Moderador", color: 0xC7CAD4, permissions: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.KickMembers] },
        { name: "◈ Juez / Reviewer", color: 0xF3F4F7, permissions: [] },
        { name: "⟡ Creador Verificado", color: 0x343844, permissions: [] },
        { name: "✦ Miembro", color: 0xC7CAD4, permissions: [] }
    ],
    categories: [
        {
            name: "✦・INICIO",
            channels: ["bienvenida", "reglas", "anuncios", "informacion-gdps", "roles"]
        },
        {
            name: "✧・COMUNIDAD",
            channels: ["general", "presentaciones", "capturas-y-clips", "off-topic"]
        },
        {
            name: "⬡・CREACIÓN",
            channels: ["showcase", "busqueda-de-creadores", "feedback-de-niveles", "ayuda-de-editor", "texturas-y-recursos"]
        },
        {
            name: "◈・PLAYTESTING Y RATES",
            channels: ["solicitar-playtest", "cola-de-playtesting", "resultados-playtest", "solicitar-rate", "cola-de-rates", "decisiones-de-review"]
        },
        {
            name: "⟡・SOPORTE",
            channels: ["soporte-tecnico", "reportar-error", "estado-del-servidor", "tickets"]
        },
        {
            name: "✦・EVENTOS",
            channels: ["eventos", "level-jams", "concursos", "inscripciones", "resultados"]
        },
        {
            name: "◈・STAFF PRIVADO",
            channels: ["staff-chat", "mod-log", "reportes-privados", "reuniones-y-decisiones", "dev-chat", "incidentes-tecnicos", "reviewers", "planificacion-eventos"],
            private: true
        }
    ]
};

client.once('ready', async () => {
    console.log(`Conectado como ${client.user.tag}`);
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        console.error("No se encontró el servidor (Guild). Verifica el GUILD_ID.");
        process.exit(1);
    }

    try {
        console.log("Verificando roles existentes...");
        const existingRoles = await guild.roles.fetch();
        
        for (const roleData of structure.roles) {
            let role = existingRoles.find(r => r.name === roleData.name);
            if (!role) {
                await guild.roles.create({
                    name: roleData.name,
                    color: roleData.color,
                    permissions: roleData.permissions,
                    reason: "Configuración automatizada GDPS"
                });
                console.log(`Rol creado: ${roleData.name}`);
            } else {
                console.log(`El rol ya existe: ${roleData.name}`);
            }
        }

        console.log("Verificando categorías y canales...");
        const existingChannels = await guild.channels.fetch();

        for (const catData of structure.categories) {
            let category = existingChannels.find(c => c.name === catData.name && c.type === 4);
            if (!category) {
                const overwrites = [];
                if (catData.private) {
                    overwrites.push({
                        id: guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    });
                }
                category = await guild.channels.create({
                    name: catData.name,
                    type: 4, // GuildCategory
                    permissionOverwrites: overwrites
                });
                console.log(`Categoría creada: ${catData.name}`);
            } else {
                console.log(`La categoría ya existe: ${catData.name}`);
            }

            for (const chanName of catData.channels) {
                let channel = existingChannels.find(c => c.name === chanName && c.parentId === category.id);
                if (!channel) {
                    await guild.channels.create({
                        name: chanName,
                        type: 0, // GuildText
                        parent: category.id
                    });
                    console.log(`  -> Canal creado: #${chanName}`);
                } else {
                    console.log(`  -> El canal ya existe: #${chanName}`);
                }
            }
        }

        console.log("¡Configuración del servidor completada exitosamente!");
        process.exit(0);
    } catch (error) {
        console.error("Error durante la configuración:", error);
        process.exit(1);
    }
});

client.login(token);
