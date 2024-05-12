const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowCita = addKeyword('CITA','cita','Cita')
    .addAction(async (_, {flowDynamic}) => {
        return await flowDynamic('Porfavor proporcione su nombre:')

    })
    .addAction({capture: true}, async (ctx, {flowDynamic}) => {
    const mensaje = ctx.body
    })
    .addAnswer(['Porfavor escriba la fecha para su cita'])
    .addAction({capture: true}, async( {ctx}) => {

    const mensaje2 = ctx.body
    return await flowDynamic(`Hola! ${mensaje}Tu cita es: ${mensaje2}`),
    
    null,
    [flowCita]

})

const flowEncuesta = addKeyword('ENCUESTA','encuesta', 'Encuesta', 'enkuesta').addAnswer([

    'Bienvenido a nuestra encuesta, nos gustaria saber su opinión acerca de nuestros servicios, por favor marque del 1 al 5 las siguientes preguntas',
    'Rapidez', {capture: true},
    'Limpieza', {capture: true},
    'Efectividad', {capture: true},
    'Atención', {capture: true},
    '¿Nos recomendarias a otras personas?', {capture: true}

])
    

const flowMenu = addKeyword('menu', 'MENU', 'Menu')
.addAnswer(['Digite CITA para agendar una cita',
    'Digite INFO para más información',
    'Digite ENCUESTA para evaluar nuestro servicio'
], null, null)

const flowPrincipal = addKeyword('hola','Hola','Holi', 'Buenas', 'oli', 'holi', 'hols', 'ola')
.addAnswer(['Hola! Bienvenido, Por favor escribe MENU para desplegar las opciones 📖'],

    null,
    [flowMenu])

const main = async () => {
    
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowMenu, flowCita, flowEncuesta])
    const adapterProvider = createProvider(BaileysProvider)
    
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
