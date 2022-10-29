export type PokemonData = {
  name: string;
  url: string;
};

export type PokemonDataGenderSpecies = {
  name: string;
  url: string;
};

type Abilities = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
};

export type PokemonInfoData = {
  id: number | string;
  name: string;
  img: string;
  type: string;
  weight: number | string;
  abilities: Abilities[];
  base_experience: string;
};

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
