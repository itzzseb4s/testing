const { Client, GatewayIntentBits, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.GUILD_ID;

if (!token || !guildId) {
    console.error("Faltan las variables de entorno DISCORD_BOT_TOKEN o GUILD_ID.");
    process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Paleta de colores astronómica / GD
const COLORS = {
    graphite: 0x17191F,
    slate: 0x343844,
    silver: 0xC7CAD4,
    ice: 0xF3F4F7
};

const structure = {
    roles: [
        { name: "✦ Fundador", color: COLORS.graphite, permissions: [] },
        { name: "⬡ Staff Técnico / Dev", color: COLORS.slate, permissions: [] },
        { name: "✧ Moderador", color: COLORS.silver, permissions: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.KickMembers] },
        { name: "◈ Juez / Reviewer", color: COLORS.ice, permissions: [] },
        { name: "⟡ Creador Verificado", color: COLORS.slate, permissions: [] },
        { name: "✦ Miembro", color: COLORS.silver, permissions: [] }
    ],
    categories: [
        {
            name: "✦・INFORMACIÓN",
            channels: [
                {
                    name: "✦・bienvenida",
                    embed: new EmbedBuilder()
                        .setTitle("✦ Bienvenid@ a la Comunidad GDPS")
                        .setDescription("¡Hola! Te damos la bienvenida a nuestro espacio dedicado a la creación, juego y superación en Geometry Dash.\n\n✧ **Primeros pasos:**\n- Lee las normas en <#✦・reglas>.\n- Entérate del estado del servidor en <#✦・gdps-info>.\n- Elige tus roles en <#✦・roles>.\n\n*Create. Test. Improve.*")
                        .setColor(COLORS.ice)
                },
                {
                    name: "✦・reglas",
                    embed: new EmbedBuilder()
                        .setTitle("⬡ Normas del Servidor")
                        .setDescription("1. **Respeto:** Mantén un ambiente sano. Cero tolerancia al acoso o discriminación.\n2. **Contenido:** Prohibido el contenido NSFW, gore o enlaces sospechosos.\n3. **Spam:** Utiliza los canales adecuados (<#⬡・showcase>) para compartir tus niveles.\n4. **Tickets:** No etiquetes al Staff directamente; usa el sistema de <#⟡・tickets>.")
                        .setColor(COLORS.slate)
                },
                {
                    name: "✦・anuncios",
                    embed: new EmbedBuilder()
                        .setTitle("📢 Anuncios Oficiales")
                        .setDescription("Canal exclusivo para novedades del GDPS, actualizaciones de versión e información relevante.")
                        .setColor(COLORS.graphite)
                },
                {
                    name: "✦・gdps-info",
                    embed: new EmbedBuilder()
                        .setTitle("◈ Información del GDPS")
                        .setDescription("**Descargas y Conexión:**\n- **Launcher / APK:** `ENLACE_DEL_GDPS`\n- **Versión:** 2.2+\n- **Servidor:** Online\n\nSi experimentas problemas al ingresar, dirígete a <#⟡・tickets>.")
                        .setColor(COLORS.ice)
                },
                {
                    name: "✦・roles",
                    embed: new EmbedBuilder()
                        .setTitle("⟡ Auto-Roles")
                        .setDescription("Reacciona o interactúa aquí para obtener tus roles de notificación y personalización de perfil.")
                        .setColor(COLORS.silver)
                }
            ]
        },
        {
            name: "✧・COMUNIDAD",
            channels: [
                {
                    name: "✧・chat",
                    embed: new EmbedBuilder()
                        .setTitle("💬 Chat General")
                        .setDescription("Espacio principal para hablar sobre Geometry Dash y convivir con la comunidad.")
                        .setColor(COLORS.ice)
                },
                {
                    name: "✧・medias",
                    embed: new EmbedBuilder()
                        .setTitle("🖼️ Capturas y Clips")
                        .setDescription("Comparte tus mejores momentos, progresos en niveles, récords y memes de GD.")
                        .setColor(COLORS.silver)
                },
                {
                    name: "✧・offtopic",
                    embed: new EmbedBuilder()
                        .setTitle("🎲 Off-Topic")
                        .setDescription("Para hablar de cualquier tema ajeno a Geometry Dash.")
                        .setColor(COLORS.slate)
                }
            ]
        },
        {
            name: "⬡・CREACIÓN",
            channels: [
                {
                    name: "⬡・showcase",
                    embed: new EmbedBuilder()
                        .setTitle("✨ Showcase de Niveles")
                        .setDescription("Publica los avances o entregas finales de tus niveles con este formato:\n- **Nombre:**\n- **ID:**\n- **Dificultad:**\n- **Video/Captura:**")
                        .setColor(COLORS.ice)
                },
                {
                    name: "⬡・feedback",
                    embed: new EmbedBuilder()
                        .setTitle("🛠️ Feedback y Opiniones")
                        .setDescription("Pide críticas constructivas para tus layouts, decoración o gameplay.")
                        .setColor(COLORS.silver)
                },
                {
                    name: "⬡・recursos",
                    embed: new EmbedBuilder()
                        .setTitle("🎨 Recursos y Texturas")
                        .setDescription("Textpacks, canciones, triggers y guías para la creación de niveles.")
                        .setColor(COLORS.slate)
                }
            ]
        },
        {
            name: "◈・RATES Y TESTS",
            channels: [
                {
                    name: "◈・pedir-test",
                    embed: new EmbedBuilder()
                        .setTitle("🧪 Solicitar Playtest")
                        .setDescription("Pide a los playtesters que prueben tu nivel antes de solicitar Rate. Envía ID y dificultad estimada.")
                        .setColor(COLORS.ice)
                },
                {
                    name: "◈・pedir-rate",
                    embed: new EmbedBuilder()
                        .setTitle("⭐ Solicitud de Rate")
                        .setDescription("¿Nivel terminado y listo? Envía la ID y un video para revisión de los Reviewers.")
                        .setColor(COLORS.silver)
                },
                {
                    name: "◈・decisiones",
                    embed: new EmbedBuilder()
                        .setTitle("📋 Registro de Rates")
                        .setDescription("Aquí se publicarán los resultados de las revisiones de niveles (Star, Featured, Epic).")
                        .setColor(COLORS.graphite)
                }
            ]
        },
        {
            name: "⟡・SOPORTE",
            channels: [
                {
                    name: "⟡・ayuda",
                    embed: new EmbedBuilder()
                        .setTitle("❓ Preguntas Frecuentes")
                        .setDescription("Consulta la solución a errores comunes antes de abrir un ticket de soporte.")
                        .setColor(COLORS.ice)
                },
                {
                    name: "⟡・tickets",
                    embed: new EmbedBuilder()
                        .setTitle("📩 Centro de Soporte")
                        .setDescription("Abre un ticket técnico para recibir atención directa del Staff de soporte.")
                        .setColor(COLORS.silver)
                },
                {
                    name: "⟡・estado",
                    embed: new EmbedBuilder()
                        .setTitle("🟢 Estado de los Servicios")
                        .setDescription("Reporte en tiempo real sobre el estado del GDPS, la base de datos y la web.")
                        .setColor(COLORS.slate)
                }
            ]
        },
        {
            name: "✦・EVENTOS",
            channels: [
                {
                    name: "✦・jams",
                    embed: new EmbedBuilder()
                        .setTitle("🏆 Level Jams")
                        .setDescription("Concursos de creación con temáticas y plazos definidos. ¡Demuestra tu talento!")
                        .setColor(COLORS.ice)
                },
                {
                    name: "✦・torneos",
                    embed: new EmbedBuilder()
                        .setTitle("⚔️ Torneos y Desafíos")
                        .setDescription("Competencias de juego, verficación de demons y desafíos para la comunidad.")
                        .setColor(COLORS.silver)
                }
            ]
        },
        {
            name: "◈・STAFF PRIVADO",
            private: true,
            channels: [
                { name: "◈・chat-staff", embed: null },
                { name: "◈・log-mods", embed: null },
                { name: "◈・devs", embed: null },
                { name: "◈・reviewers", embed: null }
            ]
        }
    ]
};

client.once('ready', async () => {
    console.log(`Bot iniciado correctamente como: ${client.user.tag}`);
    const guild = client.guilds.cache.get(guildId);
    
    if (!guild) {
        console.error("Servidor no encontrado. Revisa el GUILD_ID.");
        process.exit(1);
    }

    try {
        console.log("--- Configurando Roles ---");
        const existingRoles = await guild.roles.fetch();
        for (const rData of structure.roles) {
            let role = existingRoles.find(r => r.name === rData.name);
            if (!role) {
                await guild.roles.create({ name: rData.name, color: rData.color, permissions: rData.permissions });
                console.log(`[+] Rol creado: ${rData.name}`);
            }
        }

        console.log("--- Configurando Categorías y Canales ---");
        const existingChannels = await guild.channels.fetch();

        for (const catData of structure.categories) {
            let category = existingChannels.find(c => c.name === catData.name && c.type === 4);
            if (!category) {
                const overwrites = catData.private ? [{ id: guild.id, deny: [PermissionFlagsBits.ViewChannel] }] : [];
                category = await guild.channels.create({ name: catData.name, type: 4, permissionOverwrites: overwrites });
                console.log(`[+] Categoría creada: ${catData.name}`);
            }

            for (const chData of catData.channels) {
                let channel = existingChannels.find(c => c.name === chData.name && c.parentId === category.id);
                if (!channel) {
                    channel = await guild.channels.create({ name: chData.name, type: 0, parent: category.id });
                    console.log(`  [+] Canal creado: #${chData.name}`);

                    // Enviar Embed e inmovilizar/fijar mensaje automáticamente si existe
                    if (chData.embed) {
                        const msg = await channel.send({ embeds: [chData.embed] });
                        await msg.pin();
                        console.log(`      └─ Mensaje inicial fijado en #${chData.name}`);
                    }
                }
            }
        }

        console.log("¡Toda la estructura y mensajes automáticos han sido creados de forma exitosa!");
        process.exit(0);
    } catch (err) {
        console.error("Error durante el despliegue:", err);
        process.exit(1);
    }
});

client.login(token);
