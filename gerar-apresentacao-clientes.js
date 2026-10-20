const path = require('path');
const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Ossatura';
pptx.company = 'Ossatura';
pptx.subject = 'Arquitetura e Risco para Sistemas Críticos';
pptx.title = 'Ossatura — Arquitetura e Risco para Sistemas Críticos';
pptx.lang = 'pt-BR';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'pt-BR',
};

const C = {
  forest: '102B27',
  forest2: '1F4942',
  paper: 'F7F3E9',
  white: 'FFFDF7',
  orange: 'DF6032',
  gold: 'E9BA4C',
  mint: 'B8DFCF',
  rust: 'A85430',
  text: '536961',
  line: 'D8D1BF',
};

const W = 13.333;
const H = 7.5;
const margin = 0.62;

function addText(slide, text, options = {}) {
  slide.addText(text, {
    fontFace: 'Aptos',
    color: C.forest,
    margin: 0,
    breakLine: false,
    fit: 'shrink',
    ...options,
  });
}

function addFooter(slide, number, dark = false) {
  const color = dark ? 'B8DFCF' : C.text;
  slide.addShape(pptx.ShapeType.line, {
    x: margin,
    y: 7.03,
    w: W - margin * 2,
    h: 0,
    line: { color: dark ? '3B625A' : C.line, width: 0.6 },
  });
  addText(slide, 'OSSATURA  |  CONFIDENCIAL', {
    x: margin,
    y: 7.16,
    w: 3.8,
    h: 0.16,
    color,
    fontFace: 'Aptos',
    fontSize: 6.8,
    charSpacing: 1.1,
    bold: true,
  });
  addText(slide, String(number).padStart(2, '0'), {
    x: 12.15,
    y: 7.13,
    w: 0.5,
    h: 0.18,
    color,
    fontSize: 7.5,
    align: 'right',
  });
}

function addEyebrow(slide, text, x = margin, y = 0.62, dark = false) {
  addText(slide, text.toUpperCase(), {
    x,
    y,
    w: 5.6,
    h: 0.18,
    color: dark ? C.gold : C.orange,
    fontSize: 7.2,
    bold: true,
    charSpacing: 1.45,
  });
}

function addTitle(slide, text, x, y, w, h, dark = false, size = 29) {
  addText(slide, text, {
    x,
    y,
    w,
    h,
    color: dark ? C.white : C.forest,
    fontFace: 'Aptos Display',
    fontSize: size,
    bold: true,
    breakLine: false,
    valign: 'mid',
    paraSpaceAfterPt: 0,
  });
}

function addBody(slide, text, x, y, w, h, dark = false, size = 12) {
  addText(slide, text, {
    x,
    y,
    w,
    h,
    color: dark ? 'D3E8DF' : C.text,
    fontSize: size,
    breakLine: false,
    valign: 'top',
    paraSpaceAfterPt: 5,
  });
}

function addCard(slide, x, y, w, h, label, title, body, accent = C.orange) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: C.white },
    line: { color: C.line, width: 0.5 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h: 0.06,
    fill: { color: accent },
    line: { color: accent, transparency: 100 },
  });
  addText(slide, label.toUpperCase(), {
    x: x + 0.2, y: y + 0.24, w: w - 0.4, h: 0.17,
    color: accent, fontSize: 6.5, bold: true, charSpacing: 1.0,
  });
  addText(slide, title, {
    x: x + 0.2, y: y + 0.58, w: w - 0.4, h: 0.55,
    color: C.forest, fontFace: 'Aptos Display', fontSize: 15.5, bold: true,
    breakLine: false, valign: 'mid',
  });
  addBody(slide, body, x + 0.2, y + 1.3, w - 0.4, h - 1.52, false, 9.8);
}

// Slide 1: cover
{
  const slide = pptx.addSlide();
  slide.background = { color: C.forest };
  slide.addShape(pptx.ShapeType.arc, {
    x: 9.8, y: -1.25, w: 5.0, h: 5.0,
    adjustPoint: 0.25,
    line: { color: '3D695F', width: 1.2 },
    fill: { color: C.forest, transparency: 100 },
  });
  slide.addShape(pptx.ShapeType.arc, {
    x: 10.55, y: -0.45, w: 3.45, h: 3.45,
    adjustPoint: 0.25,
    line: { color: C.orange, width: 1.2 },
    fill: { color: C.forest, transparency: 100 },
  });
  addEyebrow(slide, 'Arquitetura e Risco para Sistemas Críticos', margin, 0.72, true);
  addTitle(slide, 'Decisões técnicas\npara sistemas que\nnão podem falhar.', margin, 1.28, 8.3, 2.65, true, 33);
  addBody(slide, 'Mais de 30 anos de experiência em tecnologia para sistemas críticos — serviços financeiros, pagamentos, benefícios, saúde e varejo de alta escala.', margin, 4.48, 6.9, 0.9, true, 14);
  slide.addShape(pptx.ShapeType.line, {
    x: margin, y: 5.92, w: 1.1, h: 0,
    line: { color: C.orange, width: 2.1 },
  });
  addText(slide, 'OSSATURA', {
    x: margin, y: 6.16, w: 2.5, h: 0.2,
    color: C.mint, fontSize: 8.2, bold: true, charSpacing: 1.7,
  });
  addFooter(slide, 1, true);
}

// Slide 2: problem
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addEyebrow(slide, 'O desafio');
  addTitle(slide, 'Quando a operação cresce,\no risco fica escondido.', margin, 1.02, 8.0, 1.28, false, 28);
  addBody(slide, 'Em sistemas críticos, decisões de arquitetura afetam receita, continuidade, parceiros e reputação. O custo de descobrir tarde é alto.', margin, 2.6, 7.4, 0.58, false, 12.3);
  addCard(slide, 0.62, 3.65, 3.88, 2.36, '01 / Disponibilidade', 'Interrupção custa caro', 'Falhas impactam transações, suporte, confiança e operação de parceiros.');
  addCard(slide, 4.72, 3.65, 3.88, 2.36, '02 / Modernização', 'Legado sem ruptura', 'A evolução precisa preservar dados, integrações, integridade e continuidade operacional.', C.gold);
  addCard(slide, 8.82, 3.65, 3.88, 2.36, '03 / Investimento', 'Risco antes do aporte', 'Decisões de investimento pedem leitura independente de tecnologia, processo e time.', C.forest2);
  addFooter(slide, 2);
}

// Slide 3: positioning
{
  const slide = pptx.addSlide();
  slide.background = { color: C.forest };
  addEyebrow(slide, 'Posicionamento', margin, 0.76, true);
  slide.addShape(pptx.ShapeType.line, {
    x: margin, y: 1.47, w: 0.1, h: 3.65,
    line: { color: C.orange, width: 2.3 },
  });
  addTitle(slide, 'A consultoria entrega\nclareza para decisões\nque não podem falhar.', 1.02, 1.48, 9.4, 2.2, true, 30);
  addBody(slide, 'O foco não é vender horas de desenvolvimento. É tornar riscos, prioridades e dependências visíveis para tecnologia, diretoria, investidores e auditoria.', 1.02, 4.35, 8.45, 0.75, true, 13.2);
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.85, y: 1.45, w: 2.25, h: 3.75,
    fill: { color: C.forest2 }, line: { color: C.forest2, transparency: 100 },
  });
  addText(slide, 'REDUZIR\nINCERTEZA\nTÉCNICA', {
    x: 10.14, y: 2.18, w: 1.68, h: 1.55,
    color: C.gold, fontSize: 17, bold: true, charSpacing: 1.0,
    valign: 'mid', align: 'center', breakLine: false,
  });
  addFooter(slide, 3, true);
}

// Slide 4: services (4 cards)
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addEyebrow(slide, 'Portfólio');
  addTitle(slide, 'Quatro formas de\ncriar valor.', margin, 1.05, 7.0, 1.22, false, 28);

  const cw = 2.91;
  const gap = 0.15;
  const cards = [
    { x: 0.62,                    label: 'Projeto fechado · entrada', title: 'Diagnóstico de Resiliência', body: 'Mapa de riscos, avaliação de arquitetura e roadmap executivo de 90 dias. Ideal para o primeiro contrato.', accent: C.orange },
    { x: 0.62 + (cw + gap),       label: 'Projeto fechado',           title: 'Tech Due Diligence',         body: 'Parecer independente sobre produto, tecnologia, processo e passivos antes de investimento ou aquisição.', accent: C.gold },
    { x: 0.62 + (cw + gap) * 2,   label: 'Projeto / manutenção',      title: 'Legacy Code Rescue',         body: 'Diagnóstico e plano de saída segura para sistemas COBOL, mainframe ou arquiteturas críticas sem suporte.', accent: C.rust },
    { x: 0.62 + (cw + gap) * 3,   label: 'Advisory mensal',           title: 'Arquitetura Fracionada',     body: 'Apoio executivo contínuo para decisões, governança de risco e acompanhamento de roadmap técnico.', accent: C.forest2 },
  ];
  cards.forEach(({ x, label, title, body, accent }) => {
    addCard(slide, x, 3.05, cw, 2.78, label, title, body, accent);
  });
  addFooter(slide, 4);
}

// Slide 5: method
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addEyebrow(slide, 'Método');
  addTitle(slide, 'Do risco identificado\nà decisão executável.', margin, 1.03, 7.7, 1.18, false, 28);
  const steps = [
    ['01', 'Diagnosticar', 'Entrevistas, evidências, arquitetura, operação e acessos.'],
    ['02', 'Priorizar', 'Riscos classificados por impacto, urgência, esforço e dependência.'],
    ['03', 'Decidir', 'Leitura executiva para alinhar negócio, tecnologia e governança.'],
    ['04', 'Acompanhar', 'Roadmap, responsáveis e rituais para transformar achados em ação.'],
  ];
  steps.forEach((step, index) => {
    const x = 0.62 + index * 3.12;
    slide.addShape(pptx.ShapeType.line, {
      x, y: 3.56, w: 2.66, h: 0,
      line: { color: index === 3 ? C.gold : C.orange, width: 1.3 },
    });
    addText(slide, step[0], { x, y: 3.06, w: 0.6, h: 0.2, color: C.orange, fontSize: 8, bold: true, charSpacing: 1.0 });
    addText(slide, step[1], { x, y: 3.88, w: 2.55, h: 0.35, color: C.forest, fontFace: 'Aptos Display', fontSize: 17, bold: true });
    addBody(slide, step[2], x, 4.46, 2.55, 0.72, false, 10.5);
  });
  addFooter(slide, 5);
}

// Slide 6: clients
{
  const slide = pptx.addSlide();
  slide.background = { color: C.forest };
  addEyebrow(slide, 'Clientes ideais', margin, 0.72, true);
  addTitle(slide, 'Para quem precisa\ndecidir com mais\nsegurança.', margin, 1.1, 5.35, 2.1, true, 28);
  const clients = [
    ['SCALE-UPS EM TRAÇÃO', 'Crescimento revelou limites de arquitetura, dados, segurança ou escala.'],
    ['FUNDOS E INVESTIDORES', 'Uma decisão de aporte exige entender sustentabilidade técnica e passivos.'],
    ['OPERAÇÕES COM LEGADO CRÍTICO', 'Sistemas COBOL, mainframe ou stacks descontinuadas em risco precisam de quem os conhece.'],
    ['OPERAÇÕES REGULADAS', 'A modernização precisa respeitar continuidade, compliance e integridade de dados.'],
  ];
  clients.forEach((client, index) => {
    const y = 0.88 + index * 1.3;
    slide.addShape(pptx.ShapeType.rect, {
      x: 7.15, y, w: 5.53, h: 1.05,
      fill: { color: C.forest2 }, line: { color: C.forest2, transparency: 100 },
    });
    addText(slide, client[0], { x: 7.45, y: y + 0.16, w: 3.9, h: 0.16, color: C.gold, fontSize: 7.0, bold: true, charSpacing: 1.2 });
    addBody(slide, client[1], 7.45, y + 0.45, 4.82, 0.4, true, 10.0);
  });
  addFooter(slide, 6, true);
}

// Slide 7: engagement
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addEyebrow(slide, 'Modelo de trabalho');
  addTitle(slide, 'Uma intervenção com\nritmo e responsabilidade.', margin, 1.03, 8.1, 1.2, false, 28);
  const phases = [
    ['ABERTURA', 'Escopo, confidencialidade, acessos e critérios de decisão.'],
    ['ANÁLISE', 'Evidências, entrevistas e avaliação de riscos e dependências.'],
    ['LEITURA EXECUTIVA', 'Riscos, prioridades, impactos e opções de decisão.'],
    ['ROADMAP', 'Próximas ações, responsáveis, marcos e acompanhamento.'],
  ];
  phases.forEach((phase, index) => {
    const x = 0.62 + index * 3.12;
    slide.addShape(pptx.ShapeType.rect, {
      x, y: 3.25, w: 2.72, h: 2.12,
      fill: { color: index === 0 ? C.mint : C.white },
      line: { color: C.line, width: 0.5 },
    });
    addText(slide, `0${index + 1}`, { x: x + 0.22, y: 3.53, w: 0.38, h: 0.16, color: C.orange, fontSize: 7.5, bold: true, charSpacing: 0.8 });
    addText(slide, phase[0], { x: x + 0.22, y: 4.0, w: 2.25, h: 0.22, color: C.forest, fontSize: 8.6, bold: true, charSpacing: 0.7 });
    addBody(slide, phase[1], x + 0.22, 4.53, 2.25, 0.58, false, 9.8);
  });
  addFooter(slide, 7);
}

// Slide 8: close
{
  const slide = pptx.addSlide();
  slide.background = { color: C.mint };
  addEyebrow(slide, 'Próxima conversa');
  addTitle(slide, 'O risco técnico está\nvisível para quem\nprecisa decidir?', margin, 1.12, 8.1, 2.0, false, 31);
  addBody(slide, 'Uma conversa inicial de 30 minutos permite entender o contexto, o evento disparador e se um diagnóstico independente pode acelerar a próxima decisão.', margin, 4.28, 7.1, 0.7, false, 13.1);

  // CTA button
  slide.addShape(pptx.ShapeType.rect, {
    x: margin, y: 5.28, w: 3.72, h: 0.55,
    fill: { color: C.forest }, line: { color: C.forest, transparency: 100 },
  });
  addText(slide, 'CONVERSA DE DESCOBERTA', {
    x: 0.86, y: 5.47, w: 3.15, h: 0.14,
    color: C.white, fontSize: 7.2, bold: true, charSpacing: 1.2, align: 'center',
  });

  // Contact info block
  slide.addShape(pptx.ShapeType.line, {
    x: margin, y: 6.14, w: 5.2, h: 0,
    line: { color: C.forest, width: 0.5 },
  });
  addText(slide, '[SEU EMAIL]  ·  linkedin.com/in/[SEU PERFIL]', {
    x: margin, y: 6.28, w: 7.0, h: 0.18,
    color: C.forest, fontSize: 9.5, charSpacing: 0.3,
  });
  addText(slide, 'Substitua pelos seus dados de contato antes de enviar.', {
    x: margin, y: 6.58, w: 6.5, h: 0.16,
    color: '3A6058', fontSize: 8.0, italic: true,
  });

  addFooter(slide, 8);
}

const outputFile = path.join(__dirname, 'apresentacao-clientes-consultoria-senior.pptx');
pptx.writeFile({ fileName: outputFile });
