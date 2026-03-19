<script lang="ts">
	import { goto } from '$app/navigation';
	import { locale, currentTranslations } from '$lib/i18n';
	import { locales } from '$lib/i18n/dates';
	import { onMount } from 'svelte';
	
	const t = $derived($currentTranslations);
	let currentLocale = $state('en');
	
	onMount(() => {
		locale.init();
		const unsub = locale.subscribe((l) => {
			currentLocale = l;
		});
		return unsub;
	});
	
	function changeLocale(event: Event) {
		const target = event.target as HTMLSelectElement;
		locale.set(target.value as keyof typeof locales);
	}
	
	async function goToDashboard() {
		const res = await fetch('/api/auth/me');
		if (res.ok) {
			goto('/admin');
		} else {
			goto('/login');
		}
	}
</script>

<svelte:head>
	<title>SaaS App - Fullstack Template</title>
</svelte:head>

<div class="landing">
	<div class="locale-selector">
		<select value={currentLocale} onchange={changeLocale}>
			{#each Object.entries(locales) as [key, lang]}
				<option value={key}>{lang.name}</option>
			{/each}
		</select>
	</div>
	
	<div class="hero">
		<h1>🚀 {t.landing.title}</h1>
		<p>{t.landing.subtitle}</p>
		<div class="cta-buttons">
			<button onclick={goToDashboard} class="btn btn-primary">{t.landing.goToDashboard}</button>
			<a href="/login" class="btn btn-secondary">{t.landing.login}</a>
		</div>
	</div>
	
	<div class="features">
		<div class="feature-card">
			<div class="feature-icon">⚡</div>
			<h3>{t.landing.featureFast}</h3>
			<p>{t.landing.featureFastDesc}</p>
		</div>
		<div class="feature-card">
			<div class="feature-icon">🐳</div>
			<h3>{t.landing.featureDocker}</h3>
			<p>{t.landing.featureDockerDesc}</p>
		</div>
		<div class="feature-card">
			<div class="feature-icon">🗄️</div>
			<h3>{t.landing.featureDb}</h3>
			<p>{t.landing.featureDbDesc}</p>
		</div>
	</div>
</div>

<style>
	.landing {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 20px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		position: relative;
	}
	
	.locale-selector {
		position: absolute;
		top: 20px;
		right: 20px;
	}
	
	.locale-selector select {
		padding: 8px 12px;
		border: 1px solid rgba(255,255,255,0.3);
		border-radius: 8px;
		background: rgba(255,255,255,0.1);
		color: #fff;
		cursor: pointer;
		backdrop-filter: blur(10px);
	}
	
	.locale-selector select option {
		color: #333;
		background: #fff;
	}
	
	.hero {
		text-align: center;
		color: #fff;
		margin-bottom: 60px;
	}
	
	.hero h1 {
		font-size: 48px;
		font-weight: 700;
		margin-bottom: 20px;
		text-shadow: 0 2px 10px rgba(0,0,0,0.2);
	}
	
	.hero p {
		font-size: 20px;
		opacity: 0.9;
		margin-bottom: 30px;
	}
	
	.cta-buttons {
		display: flex;
		gap: 15px;
		justify-content: center;
	}
	
	.btn {
		padding: 15px 30px;
		border-radius: 30px;
		text-decoration: none;
		font-weight: 600;
		font-size: 16px;
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
	}
	
	.btn-primary {
		background: #fff;
		color: #667eea;
	}
	
	.btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
	}
	
	.btn-secondary {
		background: rgba(255,255,255,0.2);
		color: #fff;
		border: 2px solid #fff;
	}
	
	.btn-secondary:hover {
		background: #fff;
		color: #667eea;
	}
	
	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 30px;
		max-width: 1200px;
		width: 100%;
	}
	
	.feature-card {
		background: rgba(255,255,255,0.1);
		backdrop-filter: blur(10px);
		padding: 40px 30px;
		border-radius: 20px;
		text-align: center;
		color: #fff;
		transition: transform 0.3s ease;
	}
	
	.feature-card:hover {
		transform: translateY(-5px);
	}
	
	.feature-icon {
		font-size: 48px;
		margin-bottom: 20px;
	}
	
	.feature-card h3 {
		font-size: 24px;
		margin-bottom: 15px;
	}
	
	.feature-card p {
		opacity: 0.9;
		line-height: 1.6;
	}
</style>
