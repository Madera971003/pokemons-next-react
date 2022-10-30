// Dependencies
import React, { useEffect, useState } from 'react';
import { Grid, Card, Box, Tab, Tabs } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import cx from 'classnames';
import { TabPanel } from './TabPanel';
// Types
import { PokemonData, PokemonInfoData } from '../../types/types';
// Styles
import styles from './styles.module.scss';

export const CardForPokemon = ({
  pokemon,
  sortType,
  gender,
  color,
}: {
  pokemon: PokemonData;
  sortType: string;
  gender: string;
  color: string;
}): JSX.Element => {
  const [pokemonData, setPokemonData] = useState<PokemonInfoData>({
    abilities: [],
    id: '',
    name: '',
    img: '',
    type: '',
    weight: '',
    base_experience: '',
  });
  const [pokemonAbilitiesData, setPokemonsAbilitiesData] = useState<any>();
  const [valueTab, setValueTab] = React.useState<number>(0);

  function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  const Gender = capitalizeFirstLetter(gender);
  const Color = capitalizeFirstLetter(color);

  const callApiData = (): void => {
    axios.get(pokemon?.url).then((res) => {
      const { data } = res;
      setPokemonData({
        id: data?.id,
        name: data?.name,
        img: data?.sprites?.other?.dream_world?.front_default,
        type: data?.types[0]?.type?.name || '',
        weight: data?.weight,
        abilities: data?.abilities,
        base_experience: data?.base_experience,
      });
    });
  };
  const callApiAbilitiesData = (): void => {
    setPokemonsAbilitiesData([]);
    pokemonData?.abilities.forEach((ability) => {
      axios.get(ability?.ability?.url).then((res) => {
        const { data } = res;
        const effect = data.effect_entries.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item?.language?.name === 'en'
        );
        setPokemonsAbilitiesData((prev: any) => [...prev, effect?.effect]);
      });
    });
  };

  const handleChange = (event: any, newValue: number): void => {
    setValueTab(newValue);
  };
  useEffect(() => {
    callApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    callApiAbilitiesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonData]);

  return (
    <Card className={styles.cardContainer}>
      <Grid container spacing={2} className={styles.gridContainer}>
        <Grid item xs={12} sm={6} md={6} lg={2}>
          <Card className={styles.cardDescription_1} elevation={8}>
            {pokemonData?.img && (
              <Image src={pokemonData?.img} width={140} height={140} />
            )}
            <h3>{pokemonData.name}</h3>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={2}>
          <Card className={styles.cardDescription_2} elevation={8}>
            <div className={styles.description}>
              {sortType === 'gender' ? <h3>Gender: {Gender}</h3> : null}
              {sortType === 'color' ? <h3>Color: {Color}</h3> : null}
              <h3>Id: {pokemonData.id}</h3>
              <h3>Type: {capitalizeFirstLetter(pokemonData.type)}</h3>
              <h3>Weight: {pokemonData.weight} lb</h3>
              <h3>Base Experience: {pokemonData.base_experience}</h3>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Card className={styles.cardDescription_3} elevation={8}>
            <h2>Abilities</h2>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={valueTab}
                  onChange={handleChange}
                  aria-label="tabs"
                >
                  {pokemonData.abilities.map((ability, index) => (
                    <Tab
                      key={`${pokemon.name}-${ability.ability.name}`}
                      label={ability.ability.name}
                      aria-controls={`simple-tabpanel-${index}`}
                    />
                  ))}
                </Tabs>
              </Box>
              {pokemonData.abilities.map((ability, index) => (
                <TabPanel
                  key={`${pokemon.name}-${ability.ability.name}`}
                  value={valueTab}
                  index={index}
                >
                  {pokemonAbilitiesData[index]}
                </TabPanel>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};
