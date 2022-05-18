import Link from 'next/link';
import {
  useState,
  useReducer,
  FormEvent,
  useContext,
  useEffect,
  useMemo
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Container } from '../styles/pages/UserStats';
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'styled-components';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const theme = useTheme();

  if (!isAuthenticated) return <></>;

  const regions = [
    {
      country: 'Brazil',
      city: 'Lagarto',
      state: 'Sergipe',
      amount: 5,
      _id: '628522e635f586251422ac21'
    },
    {
      country: 'Not found',
      city: 'Not found',
      state: 'Not found',
      amount: 11,
      _id: '6285230fdbec3da6303723b2'
    }
  ];

  const data = useMemo(() => {
    return {
      labels: regions.map((item) => item.city),
      datasets: [
        {
          label: 'Regiões',
          data: regions.map((item) => item.amount),
          backgroundColor: theme.colors.primary,
          color: theme.colors.primary,
          tick: 1
        }
      ]
    };
  }, []);

  return (
    <Container>
      <h1>
        Os usuários que acessaram o seu link de whatsapp estão nas seguintes
        regiões:
      </h1>
      <section>
        <Bar
          data={data}
          options={{ responsive: true, color: theme.colors.primary }}
          style={{
            backgroundColor: theme.colors.grey
          }}
        />
      </section>
    </Container>
  );
}
