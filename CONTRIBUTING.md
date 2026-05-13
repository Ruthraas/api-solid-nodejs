# Contributing

Obrigado por considerar contribuir com este projeto. Este guia resume o fluxo recomendado para manter as alteracoes organizadas, revisaveis e alinhadas com a arquitetura da API.

## Fluxo de trabalho

1. Crie uma branch a partir da `main`.
2. Use nomes descritivos para branches, como `feat/create-check-in` ou `docs/update-readme`.
3. Mantenha cada pull request focado em uma unica responsabilidade.
4. Atualize ou adicione testes quando alterar regras de negocio, controllers ou repositorios.
5. Abra o pull request descrevendo o objetivo da mudanca e os comandos usados para validacao.

## Commits

Prefira mensagens curtas e objetivas seguindo um prefixo semantico:

```bash
feat: add check-in validation
fix: handle invalid credentials
docs: update setup instructions
chore: update package metadata
test: cover gym search use case
```

## Validacao local

Antes de abrir um pull request, execute os comandos relevantes:

```bash
npm test
npm run build
```

Para mudancas na camada HTTP, execute tambem:

```bash
npm run test:e2e
```

## Padroes tecnicos

- Mantenha regras de negocio em `src/use-cases`.
- Evite acessar o Prisma diretamente nos controllers.
- Use os contratos em `src/repositories` para isolar persistencia.
- Use factories em `src/use-cases/factories` para compor dependencias.
- Valide entradas HTTP com Zod nos controllers.
- Crie erros de dominio em `src/use-cases/errors` quando necessario.

## Pull request

Inclua no pull request:

- resumo da mudanca;
- motivacao ou contexto;
- comandos executados para validar;
- observacoes sobre impacto em API, banco ou variaveis de ambiente.
