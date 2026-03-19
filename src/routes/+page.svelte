<svelte:head>
	<title>SaaS App - Fullstack Template</title>
</svelte:head>

<div class="landing">
	<div class="hero">
		<h1>🚀 SaaS Fullstack Template</h1>
		<p>High-performance application built with SvelteKit + Drizzle ORM + SQLite</p>
		<div class="cta-buttons">
			<a href="/admin" class="btn btn-primary">Go to Dashboard →</a>
			<a href="/admin/settings" class="btn btn-secondary">Settings</a>
		</div>
	</div>
	
	<div class="features">
		<div class="feature-card">
			<div class="feature-icon">⚡</div>
			<h3>Lightning Fast</h3>
			<p>SvelteKit with server-side rendering for optimal performance</p>
		</div>
		<div class="feature-card">
			<div class="feature-icon">🐳</div>
			<h3>Docker Ready</h3>
			<p>Full Docker setup for development and production</p>
		</div>
		<div class="feature-card">
			<div class="feature-icon">🗄️</div>
			<h3>SQLite + Drizzle</h3>
			<p>Lightweight database with type-safe ORM</p>
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
