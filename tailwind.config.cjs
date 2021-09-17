const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		// edited by beyond
		screens:{
			'xs': '520px',
			// => @media (min-width: 520px) { ... }

			'sm': '680px',
      // => @media (min-width: 680px) { ... }

      'md': '820px',
      // => @media (min-width: 820px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
		},
		extend: {},
	},
	plugins: [],
	darkMode: 'class', // added by beyond
};

module.exports = config;
