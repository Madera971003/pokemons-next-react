// Dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Select, MenuItem, FormControl } from '@mui/material';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import { CardForPokemon } from '../CardForPokemon';
// Types
import {
  PokemonData,
  PokemonDataGenderSpecies,
  PokemonDataColorSpecies,
} from '../../types/types';
// Styles
import styles from './styles.module.scss';

const URL_BASE = 'https://pokeapi.co/api/v2';
const URL_BASE_GENDER = `${URL_BASE}/gender`;
const URL_BASE_COLOR = `${URL_BASE}/pokemon-color`;
const URL_BASE_ID = `${URL_BASE}/pokemon`;
const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=5';
const COLORS = [
  'Black',
  'Blue',
  'Brown',
  'Gray',
  'Green',
  'Pink',
  'Purple',
  'Red',
  'White',
  'Yellow',
];

export function App(): JSX.Element {
  const [pokemonsData, setPokemosData] = useState<PokemonData[]>([]);
  const [pokemonGenderSpeciesData, setPokemonGenderSpeciesData] = useState<
    PokemonDataGenderSpecies[]
  >([]);
  const [pokemonColorSpeciesData, setPokemonColorSpeciesData] = useState<
    PokemonDataColorSpecies[]
  >([]);
  const [flag, setFlag] = useState<boolean>(true);
  // States values for sort by ID
  const [prevUrl, setPrevUrl] = useState<string>(URL_DEFAULT);
  const [tempUrl, setTempUrl] = useState<string>(URL_DEFAULT);
  const [nextUrl, setNextUrl] = useState<string>(URL_DEFAULT);
  // States values for sort by Gender and Color
  const [start, setStart] = useState<number>(0);
  const [tempNum, setTempNum] = useState<number>(0);
  const [end, setEnd] = useState<number>(5);
  // Sorts Types
  const [sortType, setSortType] = useState<string>('id');
  const [gender, setGender] = useState<string>(() => 'female');
  const [color, setColor] = useState<string>('black');

  const callApiDefault = (url: string): void => {
    axios.get(url).then((res) => {
      setPokemosData(res.data.results);
      if (prevUrl === nextUrl && prevUrl === tempUrl) {
        setNextUrl(res?.data?.next);
      } else if (url === nextUrl) {
        setPrevUrl(tempUrl);
        setTempUrl(nextUrl);
        setNextUrl(res?.data?.next);
      } else {
        setNextUrl(tempUrl);
        setTempUrl(prevUrl);
        if (!res?.data?.previous) {
          setPrevUrl(URL_DEFAULT);
        } else {
          setPrevUrl(res.data?.previous);
        }
      }
    });
  };

  const callApiByGender = (isPrev: boolean): void => {
    if (!isPrev) {
      setPokemosData([]);
      for (let i = tempNum; i < end; i += 1) {
        axios.get(pokemonGenderSpeciesData[i]?.url).then((res) => {
          setPokemosData((prev) => [
            ...prev,
            { name: res?.data?.name, url: `${URL_BASE_ID}/${res?.data?.id}` },
          ]);
        });
      }
      setStart(tempNum);
      setTempNum(end);
      setEnd((prev) => prev + 5);
    } else if (start !== 0 && tempNum !== 0 && tempNum !== 5) {
      setPokemosData([]);
      for (let i = start - 5; i < tempNum - 5; i += 1) {
        axios.get(pokemonGenderSpeciesData[i]?.url).then((res) => {
          setPokemosData((prev) => [
            ...prev,
            { name: res?.data?.name, url: `${URL_BASE_ID}/${res?.data?.id}` },
          ]);
        });
      }
      setStart((prev) => prev - 5);
      setTempNum((prev) => prev - 5);
      setEnd((prev) => prev - 5);
    }
  };

  const callApiByColor = (isPrev: boolean): void => {
    if (!isPrev) {
      setPokemosData([]);
      for (let i = tempNum; i < end; i += 1) {
        axios.get(pokemonColorSpeciesData[i]?.url).then((res) => {
          setPokemosData((prev) => [
            ...prev,
            { name: res?.data?.name, url: `${URL_BASE_ID}/${res?.data?.id}` },
          ]);
        });
      }
      setStart(tempNum);
      setTempNum(end);
      setEnd((prev) => prev + 5);
    } else if (start !== 0 && tempNum !== 0 && tempNum !== 5) {
      setPokemosData([]);
      for (let i = start - 5; i < tempNum - 5; i += 1) {
        axios.get(pokemonColorSpeciesData[i]?.url).then((res) => {
          setPokemosData((prev) => [
            ...prev,
            { name: res?.data?.name, url: `${URL_BASE_ID}/${res?.data?.id}` },
          ]);
        });
      }
      setStart((prev) => prev - 5);
      setTempNum((prev) => prev - 5);
      setEnd((prev) => prev - 5);
    }
  };

  const callApiByGenderSpecies = async (): Promise<void> => {
    setPokemonGenderSpeciesData([]);
    const { data } = await axios.get(`${URL_BASE_GENDER}/${gender}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.pokemon_species_details?.forEach((item: any) => {
      setPokemonGenderSpeciesData((prev) => [
        ...prev,
        {
          name: item?.pokemon_species?.name,
          url: item?.pokemon_species?.url,
        },
      ]);
    });
  };

  const callApiByColorSpecies = async (): Promise<void> => {
    setPokemonColorSpeciesData([]);
    const { data } = await axios.get(`${URL_BASE_COLOR}/${color}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.pokemon_species?.forEach((item: any) => {
      setPokemonColorSpeciesData((prev) => [
        ...prev,
        {
          name: item?.name,
          url: item?.url,
        },
      ]);
    });
  };

  const handleChangePage = (url: string, isPrev = false): void => {
    if (sortType === 'id') {
      callApiDefault(url);
    } else if (sortType === 'gender') {
      callApiByGender(isPrev);
    } else if (sortType === 'color') {
      callApiByColor(isPrev);
    }
  };

  // Handle change sorts
  const handleChangeSort = ({
    target: { value },
  }: {
    target: { value: string };
  }): void => {
    setPokemonGenderSpeciesData([]);
    setPokemonColorSpeciesData([]);
    setSortType(value);
    setPrevUrl(URL_DEFAULT);
    setTempUrl(URL_DEFAULT);
    setNextUrl(URL_DEFAULT);
    setStart(0);
    setTempNum(0);
    setEnd(5);
    setFlag(true);
  };
  const handleChangeGender = ({
    target: { value },
  }: {
    target: { value: string };
  }): void => {
    setPokemonGenderSpeciesData([]);
    setPokemonColorSpeciesData([]);
    setGender(value);
    setPrevUrl(URL_DEFAULT);
    setTempUrl(URL_DEFAULT);
    setNextUrl(URL_DEFAULT);
    setStart(0);
    setTempNum(0);
    setEnd(5);
    setFlag(true);
  };
  const handleChangeColor = ({
    target: { value },
  }: {
    target: { value: string };
  }): void => {
    setPokemonGenderSpeciesData([]);
    setPokemonColorSpeciesData([]);
    setColor(value);
    setPrevUrl(URL_DEFAULT);
    setTempUrl(URL_DEFAULT);
    setNextUrl(URL_DEFAULT);
    setStart(0);
    setTempNum(0);
    setEnd(5);
    setFlag(true);
  };

  // UseEffects
  useEffect(() => {
    if (sortType === 'id') {
      callApiDefault(URL_DEFAULT);
    } else if (sortType === 'gender') {
      callApiByGenderSpecies();
    } else if (sortType === 'color') {
      callApiByColorSpecies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, gender, color]);

  useEffect(() => {
    if (
      start === 0 &&
      pokemonGenderSpeciesData.length > 0 &&
      flag &&
      sortType === 'gender'
    ) {
      setFlag(false);
      callApiByGender(false);
    }
    if (
      start === 0 &&
      pokemonColorSpeciesData.length > 0 &&
      flag &&
      sortType === 'color'
    ) {
      setFlag(false);
      callApiByColor(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callApiByGenderSpecies, callApiByColorSpecies, gender, color]);

  return (
    <main>
      <div className={styles.selectsContainer}>
        <h3>Sort By:</h3>
        <FormControl className={styles.formContainer}>
          <Select
            value={sortType}
            onChange={handleChangeSort}
            className={styles.input}
          >
            <MenuItem value="id">Id</MenuItem>
            <MenuItem value="gender">Gender</MenuItem>
            <MenuItem value="color">Color</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.formContainer}>
          <Select
            value={gender}
            disabled={sortType !== 'gender'}
            onChange={handleChangeGender}
            className={styles.input}
          >
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="genderless">Genderless</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.formContainer}>
          <Select
            value={color}
            disabled={sortType !== 'color'}
            onChange={handleChangeColor}
            className={styles.input}
          >
            {COLORS.map((c) => (
              <MenuItem key={c} value={c.toLowerCase()}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.buttonsContainer}>
        <IconButton
          aria-label="previous"
          size="large"
          className={styles.arrowButton}
          onClick={() => handleChangePage(prevUrl, true)}
        >
          <ArrowCircleLeftTwoToneIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="next"
          size="large"
          className={styles.arrowButton}
          onClick={() => handleChangePage(nextUrl)}
        >
          <ArrowCircleRightTwoToneIcon fontSize="inherit" autoReverse />
        </IconButton>
      </div>
      {pokemonsData && (
        <>
          {pokemonsData?.map((pokemon) => (
            <div key={pokemon.name}>
              <CardForPokemon
                pokemon={pokemon}
                sortType={sortType}
                gender={gender}
                color={color}
              />
            </div>
          ))}
        </>
      )}
      <div className={styles.buttonsContainer}>
        <IconButton
          aria-label="previous"
          size="large"
          className={styles.arrowButton}
          onClick={() => handleChangePage(prevUrl, true)}
        >
          <ArrowCircleLeftTwoToneIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="next"
          size="large"
          className={styles.arrowButton}
          onClick={() => handleChangePage(nextUrl)}
        >
          <ArrowCircleRightTwoToneIcon fontSize="inherit" autoReverse />
        </IconButton>
      </div>
    </main>
  );
}
