import htmlPdf from 'html-pdf-node';
import fs from 'fs';

export async function gerarPdfPets(pet) {
    let fotoHtml = '-';

    if (pet.foto) {
        const base64 = fs.readFileSync(aluno.foto).toString('base64');
        fotoHtml = <img src="data:image/jpeg;base64,${base64}" width="120" />;
    }

    const html = `
    <html>
    <body>
        <h1>Informações do Pet</h1>

        <p>Foto: ${fotoHtml}</p>
        <p>Nome: ${aluno.nome}</p>
        <p>Descricao: ${aluno.descricao || '-'}</p>
        <p>Preco: ${aluno.preco || '-'}</p>
    </body>
    </html>
    `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}

export async function gerarPdfTodos(petRoutes) {
    const linhas = pets
        .map(
            (a) => `
            <tr>
                <td>${a.nome}</td>
                <td>${a.descricao || '-'}</td>
                <td>${a.preco || '-'}</td>
                <td>${a.foto || '-'}</td>
                </tr>`,
        )

        .join('');

    const html = `
    <h1 style="text-align: center;"> Informações do Pet </h1>

    <table border="1" cellspaing="0" cellspacing="8">
        <tr>
            <th> Nome </th>
            <th> Descricao </th>
            <th> Preco </th>
            <th> Foto </th>
        </tr>
        ${linhas}
    </table>
    <p> Total: ${pets.length} pets</p>`;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}
