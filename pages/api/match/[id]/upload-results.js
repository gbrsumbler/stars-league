import prisma from '../../../../lib/prisma';
// Importar bibliotecas para lidar com upload de arquivos e possivelmente OCR aqui

export const config = {
  api: {
    bodyParser: false, // Necessário para lidar com multipart/form-data
  },
};

export default async function handler(req, res) {
  const { id } = req.query; // ID da partida

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // --- Lógica para receber e processar o arquivo de upload --- 
    // Esta parte exige uma biblioteca para parsear o formData (ex: formidable, multer no Next.js)
    // Depois de receber o arquivo, a lógica de OCR entra aqui.
    // Exemplo conceitual (não código funcional completo de upload/OCR):
    
    // const form = new formidable.IncomingForm();
    // form.parse(req, async (err, fields, files) => {
    //   if (err) { console.error(err); return res.status(500).json({ message: 'Erro ao processar upload.' }); }
    //   const printFile = files.print; // 'print' é o nome usado no frontend formData.append('print', selectedFile)
    
    //   // --- Lógica de OCR (Optical Character Recognition) --- 
    //   // Usar uma biblioteca de OCR (ex: tesseract.js) para ler o texto da imagem printFile
    //   // Extrair nicknames, kills, pontos, etc. da print
    //   // Exemplo:
    //   // const extractedData = await performOCR(printFile.path);
    
    //   // --- Lógica para atualizar o banco de dados com Prisma --- 
    //   // Com os dados extraídos, buscar usuários no banco e atualizar seus pontos/KD
    //   // Exemplo:
    //   // for (const playerStats of extractedData) {
    //   //   await prisma.user.update({ where: { nickname: playerStats.nickname }, data: { points: { increment: playerStats.points }, kd: calculateNewKd(...) } });
    //   // }
    
    //   // Opcional: Atualizar o status da partida para 'completed' ou 'processing'
    //   // await prisma.match.update({ where: { id: String(id) }, data: { status: 'completed' } });
    
    //   res.status(200).json({ message: 'Upload recebido. Processamento pendente.' });
    // });

    // Por enquanto, apenas um placeholder de sucesso
    res.status(200).json({ message: 'Upload recebido (processamento de OCR e atualização do BD pendente).' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao receber upload.' });
  }
} 