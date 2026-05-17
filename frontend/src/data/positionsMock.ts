export type PositionMock = {
  id: number;
  title: string;
  manager: string;
  deadline: string;
  status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
};

export const POSITIONS_MOCK: PositionMock[] = [
  {
    id: 1,
    title: 'Senior Full-Stack Engineer',
    manager: 'John Doe',
    deadline: '2024-12-31',
    status: 'Abierto',
  },
  {
    id: 2,
    title: 'Data Scientist',
    manager: 'Jane Smith',
    deadline: '2024-12-31',
    status: 'Abierto',
  },
];

export const getPositionTitleById = (id: number): string | undefined =>
  POSITIONS_MOCK.find((p) => p.id === id)?.title;
