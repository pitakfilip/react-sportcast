import React from 'react';
import { translate } from '../services/LanguageService';

const TranslationTestPage = () => {
	return (
		<div>
			<h1>{translate('welcome')}</h1>
			<p>{translate('aboutUs')}</p>
			<p>{translate('contact')}</p>
		</div>
	);
};

export default TranslationTestPage;
