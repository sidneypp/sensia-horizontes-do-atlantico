# Sensia Horizontes do Atlântico

Guia de consulta rápida para os moradores do condomínio Sensia Horizontes do Atlântico. O portal reúne procedimentos, senhas das áreas comuns, serviços, contatos, documentos e FAQ. Comunicados e agenda oficiais continuam no Conviver Sensia.

## Stack

- Next.js com App Router e Route Handlers para autenticação e dados privados.
- React no cliente apenas para a interface e interações.
- Tailwind CSS 4 compilado a partir de `src/input.css`.
- Vercel Hobby pode executar as Functions dentro dos limites do plano.

## Segurança

O repositório pode ser público porque os dados privados não ficam no código versionado:

- `PORTAL_PASSWORD` é validada na API, nunca no navegador.
- `PORTAL_SESSION_SECRET` assina um cookie HttpOnly com validade de 30 dias.
- `PRIVATE_GUIDE_JSON` contém o conteúdo privado e deve ser configurada no Vercel.
- `private-guide.local.json` é usado somente no desenvolvimento local e está no `.gitignore`.
- Não use o prefixo `NEXT_PUBLIC_` nessas variáveis.

Uma senha compartilhada impede o acesso anônimo, mas pode ser repassada por um morador autenticado. Para dados que exigem segurança individual, seria necessário um usuário por morador.

## Executar localmente

Requisitos: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Depois, acesse <http://localhost:3000>. A senha local fica em `.env.local`, que não deve ser versionado.

Para validar o build completo:

```bash
npm run check
```

## Publicar no Vercel

1. Crie um repositório público no GitHub.
2. Confirme que `.env.local` e `private-guide.local.json` não foram adicionados ao commit.
3. Importe o repositório no Vercel.
4. Cadastre as variáveis `PORTAL_PASSWORD`, `PORTAL_SESSION_SECRET` e `PRIVATE_GUIDE_JSON` no ambiente Production.
5. Faça um novo deploy.

Para preencher `PRIVATE_GUIDE_JSON`, use o conteúdo de `private-guide.local.json` como valor da variável no painel do Vercel. O arquivo local contém os dados atualmente informados para o condomínio; não o publique no GitHub.

## Materiais oficiais

Os documentos e a referência visual estão em `assets/` e são copiados para `public/assets/` para serem servidos pelo Next:

- Convenção de condomínio.
- Regimento interno atualizado.
- Modelo aprovado de cortina de vidro.
