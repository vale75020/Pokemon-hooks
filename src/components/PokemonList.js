import React from 'react';

export default function PokemonList({ pokemon }) {
    return (
        <div>
            {pokemon.map(p => (
                <div className="name" key={p.url}>{p}</div>
            ))}
        </div>
    );
};

 