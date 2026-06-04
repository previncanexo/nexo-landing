'use client'

import { useState } from 'react'
import logoImage from "@/assets/logo.png";
import { m } from '../lib/motion-shim';
import { fadeUp, viewportOnce } from './motion-variants';

const TYC_TEXT = `TÉRMINOS Y CONDICIONES

CLAUSULA 1: IDENTIFICACIÓN DEL PRESTADOR Y OBJETO DEL SERVICIO DE INTERMEDIACIÓN

Previnca S.A. CUIT: 30-68914068-4, en adelante "Previnca Salud", opera exclusivamente como una plataforma digital de intermediación y gestión de servicios de salud. Su objeto principal es facilitar a los usuarios el acceso a una red de prestadores médicos, asistenciales, odontológicos y de emergencias que son terceros independientes, (en adelante, los "Prestadores").

Previnca Salud no es prestador directo de servicios de salud en los términos de la Ley N° 26.682 y su reglamentación. La relación contractual de Previnca Salud con el usuario se limita a la provisión de la plataforma tecnológica, los servicios de intermediación para la gestión de turnos, el acceso a información de los Prestadores y la administración de beneficios asociados a la afiliación.

La prestación efectiva de los servicios de salud, incluyendo diagnósticos, actos médicos, odontológicos o de emergencias, es responsabilidad exclusiva de los Prestadores. Estos actúan de forma independiente y bajo su propia dirección y control, siendo los únicos responsables por la calidad, idoneidad, oportunidad o resultado de las prestaciones médicas brindadas, así como por los daños que pudieran derivarse de su atención directa.

Previnca Salud no asume responsabilidad por los actos u omisiones de los Prestadores, ni por la calidad de los servicios médicos que estos brinden, salvo por el incumplimiento de sus propias obligaciones como intermediario y gestor de la plataforma, o por la falta de diligencia en la provisión de su servicio tecnológico. La responsabilidad de Previnca Salud se enmarcará en su rol de facilitador tecnológico, no de garante de los resultados médicos de terceros.

CLAUSULA 2. OBJETO DEL SERVICIO Y MODALIDAD DE AFILIACIÓN

La afiliación a NEXO se realiza de forma exclusivamente digital, a través de la plataforma tecnológica provista por la empresa. Mediante este proceso, el usuario declara haber leído, comprendido y aceptado los presentes Términos y Condiciones, constituyendo su consentimiento electrónico un acuerdo de voluntades válido y vinculante. Previnca Salud, en su rol de intermediario y gestor de servicios de salud, facilita el acceso a una red de Prestadores y a un conjunto de prestaciones de salud que se detallan en el plan. La información sobre las características esenciales de los servicios y las condiciones de su comercialización será provista de forma cierta, clara y detallada.

El acceso efectivo a las prestaciones y servicios se encuentra estrictamente supeditado al cumplimiento concurrente de los siguientes requisitos: a) la correcta finalización del proceso de afiliación digital y b) la acreditación del pago de la cuota correspondiente al período en curso.

Adicionalmente a las prestaciones incluidas en la afiliación, el usuario tendrá la posibilidad de contratar prestaciones adicionales bajo demanda ("pay per use") a través de la plataforma. Estas prestaciones no forman parte de la tarifa de afiliación básica y serán abonadas de forma individual al momento de su solicitud. Los precios de estos servicios adicionales, así como cualquier coseguro asociado a las prestaciones, serán informados de manera clara y fehaciente al usuario antes de su contratación, y cualquier variación en sus valores será notificada con la antelación legalmente requerida.

CLÁUSULA 3: ÁMBITO GEOGRÁFICO DE COBERTURA Y MODIFICACIONES

El servicio de intermediación y gestión de prestaciones de salud de Previnca Salud se encuentra disponible, al momento de la afiliación digital del usuario, exclusivamente en la zona geográfica de la Ciudad de Rosario, Granadero Baigorria y Villa Gobernador Gálvez. Esta delimitación inicial de la zona de cobertura será informada de manera clara, precisa y veraz al usuario antes de la contratación, y su aceptación mediante el "click" de alta implicará la conformidad con este ámbito geográfico específico.

Cualquier modificación que implique una alteración en el ámbito geográfico de las prestaciones será comunicada a los usuarios a través del sitio web nexo.previncasalud.com.ar.

CLÁUSULA 4: CONDICIONES DE AFILIACIÓN Y VERACIDAD DE LA INFORMACIÓN

A los fines de la afiliación a NEXO, será requisito excluyente que el titular sea mayor de edad, debiendo contar con dieciocho (18) años cumplidos al momento de la solicitud.

La afiliación implica la aceptación expresa e incondicional de la totalidad de los presentes Términos y Condiciones, así como de las políticas y procedimientos que los complementen, lo cual se formalizará mediante el consentimiento electrónico del usuario al momento de completar el proceso de alta digital.

CLÁUSULA 5: MODALIDAD DE CONTRATACIÓN Y CONSENTIMIENTO ELECTRÓNICO

La contratación de los servicios de Previnca Salud se realiza de forma 100% digital, en la modalidad de comercio electrónico (e-commerce), a través de la plataforma web nexo.previncasalud.com.ar. Esta modalidad se encuadra dentro de los contratos celebrados a distancia, entendiendo por tales aquellos concluidos con el uso exclusivo de medios de comunicación electrónicos, sin la presencia física simultánea de las partes. El consentimiento del usuario se perfecciona mediante la aceptación expresa de los presentes Términos y Condiciones a través de un "click" en el botón o ícono correspondiente ("clickwrap") en la plataforma digital.

CLÁUSULA 6: SERVICIOS INCLUIDOS EN LA AFILIACIÓN Y SUS CONDICIONES

La afiliación a NEXO y la acreditación del pago de la cuota correspondiente al período en curso otorga al usuario acceso a un conjunto de CUATRO prestaciones de salud específicamente incluidas en la tarifa de afiliación, detalladas a continuación.

1. Telemedicina: La telemedicina se entiende como un servicio asistencial y/o consulta realizada a distancia, utilizando tecnologías adecuadas para garantizar la prestación oportuna y de calidad, especialmente en un contexto de demanda esencial. Previnca Salud determinará la cantidad de sesiones o consultas autorizadas y los procesos de auditoría de estas prestaciones.

2. Guardias Odontológicas: Se facilitará el acceso a guardias odontológicas a través de un prestador tercerizado. El alcance del servicio de urgencia odontológica abarca únicamente las prácticas de medicación, radiografías y apertura de piezas dentarias con fines paliativos. El tratamiento posterior y definitivo de la pieza dentaria no se encuentra incluido en esta modalidad de atención.

3. Emergencias médicas: El servicio de atención médica se limita de manera exclusiva a las prestaciones derivadas de emergencias y urgencias médicas. Queda expresamente excluido de la presente cobertura el servicio de consulta o visita médica programada a domicilio.

4. Descuentos en Farmacia: Los usuarios afiliados tendrán acceso a descuentos en farmacia a través de una red de prestadores cerrada y un vademécum acotado, según los acuerdos establecidos con el colegio farmacéutico.

Previnca Salud, en su rol de intermediario, se esforzará por garantizar la continuidad y calidad de los servicios, pero no asume la responsabilidad directa por la prestación médica en sí, la cual recae en los Prestadores. En caso de que alguna prestación implique un coseguro, su valor será debidamente informado al momento de la afiliación.

CLÁUSULA 7: SERVICIOS ADICIONALES (ON-DEMAND)

Adicionalmente a las prestaciones incluidas en la afiliación básica, NEXO ofrece a sus usuarios la posibilidad de contratar servicios de salud adicionales bajo demanda ("pay per use") a través de su plataforma digital. Estas prestaciones no forman parte de la tarifa de afiliación mensual y serán abonadas de forma individual por el usuario al momento de su solicitud y confirmación.

CLÁUSULA 8: ZONAS RESTRINGIDAS O DE RIESGO PARA LA PRESTACIÓN DE SERVICIOS

Previnca Salud, en su compromiso de garantizar la seguridad y calidad de la atención sanitaria, así como la integridad física de los Prestadores, se reserva la facultad de no prestar servicios en determinadas zonas geográficas que, por razones objetivas de seguridad pública o riesgo inminente para la vida o integridad de las personas, sean calificadas como "zonas restringidas" o "zonas rojas". Esta delimitación del riesgo se fundamenta en la necesidad de proteger al personal que debe concurrir a brindar las prestaciones, y no implicará un incumplimiento contractual por parte de Previnca Salud. La calificación de una zona como restringida o de riesgo se basará en criterios objetivos y verificables, y no en el mero arbitrio de Previnca Salud.

CLÁUSULA 9: OBLIGACIONES DEL USUARIO

El usuario de Previnca Salud se compromete a cumplir con las siguientes obligaciones, esenciales para la correcta prestación y aprovechamiento de los servicios de intermediación y gestión de salud, en un marco de buena fe y colaboración mutua:

1. Uso Adecuado del Servicio y Cooperación: El usuario se obliga a utilizar la plataforma y los servicios ofrecidos por Previnca Salud de manera diligente y responsable, siguiendo las indicaciones y protocolos establecidos para cada prestación. Esto incluye, pero no se limita a, cumplir con las indicaciones médicas o de los Prestadores y cooperar activamente en su propio proceso de atención de salud. La falta de colaboración del paciente con el profesional puede ser un factor relevante en la evaluación de la responsabilidad.

2. Veracidad y Actualización de la Información: El usuario deberá proporcionar información completa, clara y veraz sobre su identidad, datos de contacto y estado de salud al momento de la afiliación y cada vez que le sea requerida para la prestación de un servicio. Asimismo, se compromete a mantener actualizada dicha información. La falsedad, inexactitud u omisión deliberada de datos o información relevante, que demuestre una conducta de mala fe, podrá dar lugar a la resolución del contrato por parte de Previnca Salud, siempre que se acredite fehacientemente la mala fe del usuario en los términos del artículo 961 del Código Civil y Comercial de la Nación.

3. Trato Digno y Respetuoso: El usuario se compromete a dispensar un trato digno y respetuoso al personal de los Prestadores y a cualquier otro profesional o auxiliar que intervenga en la prestación de los servicios, así como a sus familiares o acompañantes, en consonancia con el derecho del paciente a un trato digno y respetuoso.

4. Permitir Acceso al Domicilio: En aquellos casos en que la naturaleza del servicio lo requiera (ej. atención de urgencias médicas domiciliarias), el usuario se obliga a permitir el acceso seguro y oportuno del personal de los Prestadores a su domicilio o al lugar donde se encuentre el paciente, una vez coordinada la atención.

CLÁUSULA 10: PRECIO Y FORMA DE PAGO

El usuario se obliga al pago de los costos de afiliación, suscripción mensual y, en su caso, de los servicios adicionales contratados bajo demanda ("pay per use"), conforme a los valores y condiciones que se detallan en el plan de afiliación y en la información específica de cada servicio. Previnca Salud se compromete a suministrar al usuario, de forma cierta, clara y detallada, toda la información relacionada con las características esenciales de los servicios y las condiciones de su comercialización, incluyendo su cuantía, modo de determinación o actualización, y la existencia de aranceles complementarios o coseguros.

Previnca Salud podrá establecer libremente los valores de las cuotas de los planes de salud ofrecidos durante toda la vigencia del contrato, y el porcentaje de ajuste podrá variar según las características específicas del plan.

Los métodos de pago aceptados por Previnca Salud incluyen, entre otros, la utilización de plataformas de pago digital como Mercado Pago y otras billeteras virtuales, así como la generación de links de pago. El proceso de alta y la gestión de pagos se realizará a través de la plataforma digital de Previnca Salud, donde el usuario podrá vincular sus medios de pago. Los pagos realizados mediante códigos de respuesta rápida (QR) se considerarán medios de pago equivalentes. En caso de generarse cuentas pendientes de pago en la billetera virtual del usuario o mediante links de pago, Previnca Salud notificará al usuario para su regularización.

CLÁUSULA 11: REVOCACIÓN DE LA ACEPTACIÓN, SUSPENSIÓN Y BAJA DEL SERVICIO

Revocación de la aceptación: El usuario tiene derecho a revocar la aceptación del servicio contratado dentro del plazo de diez (10) días corridos contados a partir de la fecha de la afiliación. A tal efecto, podrá utilizar el "Botón de Arrepentimiento" dispuesto de manera visible en la plataforma web. Constituye una condición esencial e indispensable para la procedencia de esta revocación que el servicio no haya sido utilizado dentro del mencionado plazo.

Suspensión del servicio: La falta de pago de una (1) cuota mensual facultará a la Compañía a disponer la suspensión automática del servicio. Previnca Salud notificará la suspensión e intimará al usuario al pago de la suma adeudada.

La extinción del vínculo contractual con Previnca Salud puede originarse por decisión del usuario o por resolución de Previnca Salud, conforme a las siguientes condiciones:

1. Rescisión por Decisión del Usuario: El usuario podrá rescindir el contrato de afiliación en cualquier momento, sin limitación alguna y sin penalidad. Para evitar el ejercicio abusivo de este derecho, el mismo podrá ser ejercido solamente una (1) vez por año. La solicitud de baja podrá realizarse a través de la plataforma digital de Previnca Salud, mediante un mecanismo de "botón de baja" de fácil acceso y directo, que simplifique la gestión y agilice el proceso.

2. Resolución por Parte de Previnca Salud: Previnca Salud podrá resolver el vínculo contractual únicamente por las siguientes causales: a) Por falta de pago: En caso de falta de pago de tres (3) cuotas íntegras y consecutivas, Previnca Salud podrá resolver el vínculo contractual de manera automática, con la finalidad de impedir el devengamiento de nuevos períodos de facturación, notificando al usuario de la resolución. b) Por falsedad de los datos brindados.

CLÁUSULA 12: MODIFICACIÓN DE TÉRMINOS Y CONDICIONES

Previnca Salud se reserva la facultad de modificar los presentes Términos y Condiciones en cualquier momento. En caso de que el usuario no esté de acuerdo con las modificaciones introducidas, tendrá la opción de rescindir el contrato sin cargo ni penalidad alguna, ejerciendo su derecho de baja conforme a lo establecido en la Cláusula 11, sin que ello genere derecho a indemnización alguna por parte de Previnca Salud.

CLÁUSULA 13: RESPONSABILIDAD DE PREVINCA SALUD Y DE LOS PRESTADORES

Previnca Salud opera exclusivamente como una plataforma digital de intermediación y gestión de servicios de salud, facilitando el acceso de los usuarios a una red de Prestadores médicos, asistenciales, odontológicos y de emergencias que son terceros independientes. En tal sentido, Previnca Salud no es el prestador directo de las prestaciones médicas, y su responsabilidad se limita a la provisión y el adecuado funcionamiento de la plataforma tecnológica, los servicios de intermediación para la gestión de turnos, el acceso a información de los Prestadores y la administración de los beneficios asociados a la afiliación.

La prestación efectiva de los servicios de salud, incluyendo diagnósticos, actos médicos, odontológicos o de emergencias, es responsabilidad exclusiva de los Prestadores. Estos actúan de forma independiente y bajo su propia dirección y control, siendo los únicos responsables por la calidad, idoneidad, oportunidad o resultado de las prestaciones médicas brindadas, así como por los daños que pudieran derivarse de su atención directa.

CLÁUSULA 14: PROTECCIÓN DE DATOS PERSONALES Y CONFIDENCIALIDAD

Previnca Salud se compromete a proteger la privacidad y la confidencialidad de los datos personales de sus usuarios, en estricto cumplimiento de la Ley N° 25.326 de Protección de los Datos Personales, su Decreto Reglamentario N° 1558/2001, la Ley N° 26.529 de Derechos del Paciente y su Decreto Reglamentario N° 1089/2012, así como toda la normativa complementaria y concordante en la materia.

CLÁUSULA 15: COMUNICACIONES Y NOTIFICACIONES

El usuario acepta que todas las notificaciones, comunicaciones y avisos relacionados con los presentes Términos y Condiciones, la prestación de los servicios de Previnca Salud y la gestión de su afiliación, se realizarán de forma válida y eficaz a través de medios digitales y electrónicos. La utilización de comunicaciones electrónicas y domicilios electrónicos constituidos posee idéntica eficacia jurídica y valor probatorio que sus equivalentes convencionales.

1. Domicilio Electrónico y Canales Formales de Notificación: El domicilio electrónico del usuario será el canal principal y formal para todas las notificaciones vinculantes. Este domicilio se constituirá a través de la cuenta de usuario en la plataforma de Previnca Salud (sitio web) y/o la dirección de correo electrónico que el usuario haya registrado y validado al momento de la afiliación. Las notificaciones se considerarán perfeccionadas y válidas a partir de la fecha y hora en que queden disponibles en la bandeja de comunicaciones de la plataforma o en la casilla de correo electrónico registrada. En caso de que el usuario haya registrado múltiples domicilios electrónicos y no haya designado uno principal, la notificación realizada en cualquiera de ellos se considerará válida para todos los intervinientes.

2. Circuito de Comunicaciones de Mora en el Pago: En caso de mora en el pago de una (1) cuota, Previnca Salud notificará al usuario la suspensión del servicio a través de su domicilio electrónico constituido (plataforma y/o correo electrónico). Esta comunicación incluirá la intimación para regularizar la situación en el plazo establecido, detallando las sumas adeudadas y las consecuencias de la falta de pago. La interpelación electrónica para constituir en mora al deudor asume eficacia probatoria como documento electrónico.

3. Circuito de Comunicaciones de Baja del Servicio: Las comunicaciones relativas a la baja del servicio, ya sea por decisión del usuario o por resolución de Previnca Salud, se realizarán a través del domicilio electrónico constituido del usuario. Previnca Salud enviará una constancia fehaciente de la recepción del pedido de rescisión o de la notificación de la resolución contractual, y de la fecha de su impacto.

4. Avisos de Cortesía: Previnca Salud podrá utilizar otros medios de comunicación digital, como notificaciones push en la aplicación móvil, mensajes SMS o WhatsApp, para enviar avisos de cortesía, recordatorios o información de interés general. Sin embargo, estos avisos no revisten el carácter de notificación formal y su falta de recepción, cualquiera sea el motivo, no afectará en modo alguno la validez de las notificaciones realizadas a través del domicilio electrónico constituido.

CLÁUSULA 16: LEGISLACIÓN APLICABLE Y JURISDICCIÓN

Los presentes Términos y Condiciones se regirán por el Código Civil y Comercial de la Nación.

En lo que respecta a la jurisdicción para la resolución de cualquier controversia o litigio derivado de la interpretación, validez, celebración, cumplimiento o incumplimiento de los presentes Términos y Condiciones, serán competentes los Tribunales Provinciales de Rosario.

CLÁUSULA 20: ACEPTACIÓN DE LOS TÉRMINOS Y CONDICIONES

Al completar el proceso de afiliación digital y hacer "click" en el botón de aceptación correspondiente, el usuario declara expresamente haber leído, comprendido y aceptado la totalidad de los presentes Términos y Condiciones, así como la Política de Privacidad y cualquier otro anexo o documento complementario que forme parte integral del contrato. Esta manifestación de voluntad constituye un consentimiento electrónico válido y vinculante para las partes.`

function TerminosModal({ onClose }: { onClose: () => void }) {
  const paragraphs = TYC_TEXT.trim().split(/\n\n+/)
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #12053d 0%, #2d1266 100%)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="px-6 py-5 flex items-center justify-between shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
        >
          <h2 className="font-bold text-white text-base">Términos y Condiciones</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm"
            style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.70)', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3">
          {paragraphs.map((para, i) => {
            const isHeading = /^(TÉRMINOS Y CONDICIONES|CL[AÁ]USULA)/.test(para.trim())
            return isHeading ? (
              <h3 key={i} className="font-bold text-white text-xs uppercase tracking-wide mt-4 first:mt-0">
                {para.trim()}
              </h3>
            ) : (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                {para.trim()}
              </p>
            )
          })}
        </div>
        <div className="px-6 py-4 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.70)', cursor: 'pointer' }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  const [showTyC, setShowTyC] = useState(false)
  return (
    <>
      {showTyC && <TerminosModal onClose={() => setShowTyC(false)} />}
      <footer
        className="relative z-[20] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--purple) 0%, var(--pink) 100%)'
        }}
      >
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
            width: '100%',
            height: '100%'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-[15%] w-[300px] h-[300px] rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] rounded-full bg-white/10 blur-[80px]" />

        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
          {/* Main Footer Content */}
          <m.div
            className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* Logo & Description - 4 cols */}
            <div className="col-span-2 md:col-span-4">
              <img src={logoImage} alt="Previnca Nexo" className="h-10 mb-5" />
              <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-[280px]">
                Tu salud y tu bienestar, sin vueltas.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {[
                  {
                    label: 'Instagram',
                    href: 'https://www.instagram.com/previnca_salud/',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    )
                  },
                  {
                    label: 'Facebook',
                    href: 'https://www.facebook.com/previnca.salud',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    )
                  },
                  {
                    label: 'LinkedIn',
                    href: 'https://www.linkedin.com/company/previnca-salud/',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    )
                  }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105 border border-white/10"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Servicios - 2 cols */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Servicios</h3>
              <ul className="space-y-3">
                {[
                  { href: '#beneficios', label: 'Previnca Nexo' },
                  { href: '#carta', label: '+Bienestar' },
                  { href: '#como', label: 'Cómo funciona' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/65 text-sm hover:text-white transition-colors duration-300 no-underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto - 3 cols */}
            <div className="col-span-1 md:col-span-3">
              <h3 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Contacto</h3>
              <ul className="space-y-3">
                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    ),
                    text: '+54 9 3415 05-6130'
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    text: 'consultas@previncasalud.com.ar'
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    text: 'Rosario, Santa Fe'
                  }
                ].map((item) => (
                  <li key={item.text} className="text-white/65 text-sm flex items-center gap-3">
                    <span className="flex-shrink-0 opacity-60">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Información - 3 cols */}
            <div className="col-span-2 md:col-span-3">
              <h3 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Información</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setShowTyC(true)}
                    className="text-white/65 text-sm hover:text-white transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    Términos y Condiciones
                  </button>
                </li>
                {[
                  { label: 'Preguntas Frecuentes', href: '#faq' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-white/65 text-sm hover:text-white transition-colors duration-300 no-underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        </div>

        {/* Copyright */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="border-t border-white/15 py-6 pb-8 lg:pb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
              <div className="text-xs text-white/50">
                © 2026 Previnca. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
