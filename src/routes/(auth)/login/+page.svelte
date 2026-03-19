<script lang="ts">
	import { enhance } from '$app/forms';
	import { locale, currentTranslations } from '$lib/i18n';
	import { locales } from '$lib/i18n/dates';
	import { onMount } from 'svelte';
	
	let { form } = $props();
	let loading = $state(false);
	let currentLocale = $state('en');
	
	const t = $derived($currentTranslations);
	
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
</script>

<svelte:head>
	<title>{t.auth.login} - SaaS App</title>
</svelte:head>

<div class="auth-container">
	<div class="locale-selector">
		<select value={currentLocale} onchange={changeLocale}>
			{#each Object.entries(locales) as [key, lang]}
				<option value={key}>{lang.name}</option>
			{/each}
		</select>
	</div>
	
	<div class="auth-card">
		<div class="auth-header">
			<span class="logo-icon">🚀</span>
			<h1>{t.auth.login}</h1>
			<p>{t.auth.hasAccount}</p>
		</div>

		{#if form?.error}
			<div class="error-message">{form.error}</div>
		{/if}

		<form method="POST" use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				loading = false;
				await update();
			};
		}}>
			<div class="form-group">
				<label for="email">{t.auth.email}</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					placeholder="you@example.com"
					value={form?.email ?? ''}
				/>
			</div>

			<div class="form-group">
				<label for="password">{t.auth.password}</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					placeholder="••••••••"
				/>
			</div>

			<button type="submit" class="btn btn-primary" disabled={loading}>
				{loading ? t.common.loading : t.auth.login}
			</button>
		</form>

		<div class="auth-footer">
			<p>{t.auth.noAccount} <a href="/register">{t.auth.createOne}</a></p>
		</div>
	</div>
</div>

<style>
	.auth-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 20px;
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

	.auth-card {
		background: #fff;
		border-radius: 20px;
		padding: 40px;
		width: 100%;
		max-width: 420px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
	}

	.auth-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.logo-icon {
		font-size: 48px;
		display: block;
		margin-bottom: 15px;
	}

	.auth-header h1 {
		font-size: 28px;
		font-weight: 700;
		color: #333;
		margin: 0 0 10px 0;
	}

	.auth-header p {
		color: #666;
		margin: 0;
	}

	.error-message {
		background: #f8d7da;
		color: #721c24;
		padding: 12px 15px;
		border-radius: 8px;
		margin-bottom: 20px;
		font-size: 14px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		font-weight: 500;
		color: #333;
		margin-bottom: 8px;
	}

	.form-group input {
		width: 100%;
		padding: 12px 15px;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		font-size: 16px;
		transition: border-color 0.2s;
		box-sizing: border-box;
	}

	.form-group input:focus {
		outline: none;
		border-color: #667eea;
	}

	.btn {
		width: 100%;
		padding: 14px;
		border-radius: 8px;
		border: none;
		font-weight: 600;
		font-size: 16px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.auth-footer {
		text-align: center;
		margin-top: 25px;
		color: #666;
	}

	.auth-footer a {
		color: #667eea;
		text-decoration: none;
		font-weight: 500;
	}

	.auth-footer a:hover {
		text-decoration: underline;
	}
</style>
