# zen_Money

Gerenciador de transações financeiras pessoais. Permite visualizar, adicionar, filtrar e excluir receitas e despesas com resumo financeiro em tempo real, suportando até 30.000 transações com performance total.

---

## Demo

> 🔗 **Deploy:** [zen-money.netlify.app](https://zen-money.netlify.app/)

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| [Vue 3](https://vuejs.org/) | `^3.5.29` | Framework principal (Composition API) |
| [TypeScript](https://www.typescriptlang.org/) | `~5.9.3` | Tipagem estática |
| [Vite](https://vite.dev/) | `^7.3.1` | Build tool e dev server |
| [Pinia](https://pinia.vuejs.org/) | `^3.0.4` | Gerenciamento de estado |
| [Vue Router](https://router.vuejs.org/) | `^5.0.3` | Roteamento |
| [Tailwind CSS v4](https://tailwindcss.com/) | `^4.2.1` | Estilização utilitária |
| [VeeValidate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/) | `^4.15.1` | Validação de formulários tipada |
| [Radix Vue](https://www.radix-vue.com/) | `^1.9.17` | Componentes headless acessíveis (Dialog, Select, DatePicker) |
| [Lucide Vue Next](https://lucide.dev/) | `^0.577.0` | Biblioteca de ícones |
| [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/) | (via radix-vue) | Manipulação de datas internacionalizadas |

### Dependências de desenvolvimento

| Pacote | Versão | Função |
|---|---|---|
| `vue-tsc` | `^3.2.5` | Type-check para `.vue` files |
| `@vitejs/plugin-vue` | `^6.0.4` | Plugin Vue para Vite |
| `vite-plugin-vue-devtools` | `^8.0.6` | Vue DevTools integrado |
| `npm-run-all2` | `^8.0.4` | Execução paralela de scripts npm |
| `@tsconfig/node24` | `^24.0.4` | Base tsconfig para Node 24 |
| `@types/node` | `^24.11.0` | Tipos Node.js |
| `@vue/tsconfig` | `^0.8.1` | Base tsconfig para projetos Vue |

---

## Pré-requisitos

- **Node.js** `^20.19.0` ou `>=22.12.0`
- **npm** `>=10`

---

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/zen-money.git
cd zen-money
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### 4. Build de produção

```bash
npm run build
```

Os arquivos gerados ficam em `/dist`.

### 5. Preview do build

```bash
npm run preview
```

### 6. Verificação de tipos

```bash
npm run type-check
```

---

## Estrutura de pastas

```
src/
├── assets/             # Imagens e ícones estáticos
├── components/
│   ├── common/         # Componentes base reutilizáveis (Button, Input, Select, Dialog…)
│   └── layout/         # Componentes estruturais (Header)
├── composables/        # Composables Vue
├── router/             # Definição de rotas (Vue Router)
├── schemas/            # Schemas de validação Zod
├── stores/             # Stores Pinia (transactions, theme)
├── styles/             # CSS global e tokens de design (Tailwind v4)
├── types/              # Tipos e interfaces TypeScript globais
├── utils/              # Utilitários puros (formatters, categories, mockData)
├── views/
│   ├── Dashboard/      # View principal com listagem, filtros e resumo
│   └── NotFound/       # Página 404
└── workers/            # Web Workers (geração de mock data)
```

---

## Decisões técnicas

### Virtual scroll manual para 30.000 transações
A listagem de transações renderiza apenas os itens visíveis na viewport, calculando dinamicamente os índices de início e fim com base na posição de scroll e na altura fixa de cada item (`64px`). Isso garante performance constante independente do volume de dados, sem paginação.

### Web Worker para mock data
A geração das 30.000 transações mockadas é feita em um `Worker` dedicado (`src/workers/mockData.worker.ts`), evitando bloquear a thread principal durante a inicialização da aplicação. A store exibe um estado de loading até receber os dados via `postMessage`.

### VeeValidate + Zod
O formulário de nova transação utiliza VeeValidate integrado ao Zod via `toTypedSchema`. A validação ocorre apenas no submit e nas interações do usuário (campos tocados), nunca de forma prematura ao abrir o modal.

### Pinia
Estado global dividido em duas stores com responsabilidade única:
- `useTransactionsStore` — transações, filtros, getters calculados (totais, saldo, lista filtrada) e ações (add, delete, filter)
- `useThemeStore` — alternância dark/light com persistência via `localStorage`

### Radix Vue
Componentes como `Select`, `Dialog` e `DatePicker` são construídos sobre primitivos Radix Vue headless, garantindo acessibilidade nativa (ARIA, navegação por teclado, foco trap) sem overhead de bibliotecas de UI completas.

### Separação types / utils
- `src/types/` — exclusivamente contratos TypeScript (interfaces e union types). Não exporta valores.
- `src/utils/categories.ts` — constantes de runtime (labels, metadados de ícones, listas por tipo).
