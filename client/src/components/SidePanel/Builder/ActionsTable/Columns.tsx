import type { ColumnDef } from '@tanstack/react-table';

export type Spec = {
  name: string;
  method: string;
  path: string;
  domain: string;
};

<<<<<<< HEAD
export const fakeData: Spec[] = [
  {
    name: 'listPets',
    method: 'get',
    path: '/pets',
    domain: 'petstore.swagger.io',
  },
  {
    name: 'createPets',
    method: 'post',
    path: '/pets',
    domain: 'petstore.swagger.io',
  },
  {
    name: 'showPetById',
    method: 'get',
    path: '/pets/{petId}',
    domain: 'petstore.swagger.io',
  },
];

=======
>>>>>>> upstream/main
export const columns: ColumnDef<Spec>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Method',
    accessorKey: 'method',
  },
  {
    header: 'Path',
    accessorKey: 'path',
  },
<<<<<<< HEAD
  // {
  //   header: '',
  //   accessorKey: 'action',
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   cell: ({ row: _row }) => (
  //     <button className="btn relative btn-neutral h-8 rounded-lg border-token-border-light font-medium">
  //       <div className="flex w-full gap-2 items-center justify-center">Test</div>
  //     </button>
  //   ),
  // },
=======
>>>>>>> upstream/main
];
