import { writable, derived } from 'svelte/store';
import { initialBodyStyle } from '../utils/initialBodyStyle';

// Начальный режим темы
const themeMode = writable('light');

// Определение темы оформления пользовательского интерфейса
const theme = derived(
	themeMode,
	($themeMode) => ({
		border: {
			elegant: {
				color: $themeMode === 'light' ? '#E7E7E7' : '#2C2C2C'
			},
			disabled: {
				color: $themeMode === 'light' ? '#D6D6D6' : '#3D3D3D',
				width: '1px'
			},
			focused: {
				color: $themeMode === 'light' ? '#C7C7C7' : '#5A5A5A'
			},
			active: {
				color: $themeMode === 'light' ? '#959595' : '#A0A0A0',
				width: '2px'
			},
			borderRadius: {
				default: '0.38rem',
				balanced: '0.525rem',
				extra: '0.75rem',
				ultimate: 'string'
			}
		},
		controls: {
			button: {
				filter: $themeMode === 'light' ? 'brightness(118%)' : 'contrast(63%)'
			},
			height: {
				small: '3rem',
				medium: '6rem',
			},
			width: '15rem'
		},
		icon: {
			color: {
				primary: $themeMode === 'light' ? '#757575' : '#E0E0E0'
			}
		},
		padding: {
			min: '0.3rem',
			default: '0.66rem',
			balanced: '0.85rem',
			extra: 'string',
			ultimate: 'string',
		},
		palette: {
			primary: $themeMode === 'light' ? '#5BB056' : '#F41C1C',
			secondary: $themeMode === 'light' ? '#D06BCC' : '#FF35F8',
			background: $themeMode === 'light' ? 'white' : '#050505',
			text: {
				contrast: $themeMode === 'light' ? '#111111' : '#FEFEFE',
				main: $themeMode === 'light' ? '#444' : '#fdfdfd',
				label: $themeMode === 'light' ? '#B4B4B4' : '#808080',
				labelBalanced: $themeMode === 'light' ? '#a2a2a2' : '#909090',
				labelContrast: $themeMode === 'light' ? '#8a8a8a' : '#a0a0a0',
			}
		},
		surface: {
			header: {
				background: $themeMode === 'light' ? 'white' : '#212121'
			},
			ghost: {
				background: $themeMode === 'light' ? '#F7F7F7' : '#181818'
			},
			filled: {
				background: $themeMode === 'light' ? '#EEEEEE' : '#212121'
			},
			underSolid: {
				background: $themeMode === 'light' ? '#E4E4E4' : '#383838'
			},
			solid: {
				background: $themeMode === 'light' ? '#ddd' : '#404040'
			}
		},
		typography: {
			font: 'Century Gothic',
			fontUrl: './fonts/century-gothic-original/century-gothic.ttf',
			fontSize: '16px',
			fontStyle: 'normal',
			fontWeight: '100',
			format: 'truetype',
			maxSize: '32px',
			letterSpacing: '-0.02rem'
		},
		effectsTimeCode: '0.3s',
		themeMode: $themeMode // добавляем режим темы, чтобы отслеживать его изменения
	})
);

// Функция, которая возвращает противоположную тему
const getOppositeTheme = (theme) => {
	return theme === 'light' ? 'dark' : 'light';
};

// Функция для переключения режима темы
const toggleThemeMode = () => {
	// Обновление значения themeMode
	themeMode.update((current) => {
		const newTheme = getOppositeTheme(current);
		return newTheme;
	});

	initialBodyStyle();
};

// Экспортируем все необходимые элементы
export { theme as themeStore, themeMode, toggleThemeMode };
