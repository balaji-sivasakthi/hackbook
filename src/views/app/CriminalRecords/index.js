import React from 'react';
import Layout from '../../../layouts/index';
import Tabulation from '../../../components/Table';

function CriminalRecords() {
  const DATA = [
    {
      id: '322424',
      name: 'Maniyu',
      mobile: '998984999',
    },
    {
      id: '322424',
      name: 'Henin',
      mobile: '998984999',
    },
    {
      id: '45545',
      name: 'Gratus Richard',
      mobile: '998984999',
    },
  ];

  return (
    <Layout>
      <Tabulation data={DATA} />;
    </Layout>
  );
}

export default CriminalRecords;
