import pandas as pd
data = pd.read_json("../csv/pokedexFull_py.json")
pokemon = pd.read_json((data["poke"]).to_json(),orient="index")
corrs = pokemon.corr()
print(corrs)
corrs.to_csv("../csv/pokemon_corr_final.csv")