#!/usr/bin/env node

/**
 * ============================================
 * BUILD SCRIPT - OTIMIZAÇÃO PARA PRODUÇÃO
 * ============================================
 *
 * Este script:
 * - Minifica arquivos CSS
 * - Minifica arquivos JavaScript
 * - Minifica HTML
 * - Copia arquivos para pasta dist/
 * - Gera relatório de redução de tamanho
 *
 * Uso:
 *   node build.js
 *
 * Requer:
 *   npm install --save-dev terser clean-css-cli html-minifier-terser
 *
 * ============================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================
// CONFIGURAÇÃO
// ============================================

const config = {
    sourceDir: __dirname,
    outputDir: path.join(__dirname, 'dist'),

    // Arquivos a serem minificados
    css: [
        'assets/css/style.css',
        'assets/css/validation-styles.css',
        'assets/css/themes.css'
    ],

    js: [
        'assets/js/router.js',
        'assets/js/validation.js',
        'assets/js/masks.js',
        'assets/js/themes.js',
        'assets/js/app.js',
        'assets/js/app-features.js',
        'assets/js/components/pages.js',
        'assets/js/components/pages2.js',
        'assets/data/mock-data.js'
    ],

    html: [
        'index.html'
    ],

    // Arquivos/pastas a serem copiados sem modificação
    copy: [
        'docs/',
        'VERSION',
        'CHANGELOG.md',
        'README.md',
        'CLAUDE.md',
        'GITFLOW.md'
    ]
};

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Cria diretório recursivamente
 */
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

/**
 * Formata tamanho de arquivo
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Calcula redução percentual
 */
function calculateReduction(original, minified) {
    return Math.round(((original - minified) / original) * 100);
}

// ============================================
// MINIFICAÇÃO
// ============================================

const stats = {
    css: { original: 0, minified: 0 },
    js: { original: 0, minified: 0 },
    html: { original: 0, minified: 0 },
    total: { original: 0, minified: 0 }
};

/**
 * Minifica arquivo CSS
 */
function minifyCSS(inputFile, outputFile) {
    console.log(`  Minificando CSS: ${inputFile}`);

    const input = path.join(config.sourceDir, inputFile);
    const output = path.join(config.outputDir, outputFile);

    // Garante que o diretório de saída existe
    ensureDir(path.dirname(output));

    // Estatísticas
    const originalSize = fs.statSync(input).size;

    try {
        // Usa clean-css via linha de comando
        execSync(`npx clean-css-cli -o "${output}" "${input}"`, { stdio: 'inherit' });

        const minifiedSize = fs.statSync(output).size;

        stats.css.original += originalSize;
        stats.css.minified += minifiedSize;

        console.log(`    ✓ ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${calculateReduction(originalSize, minifiedSize)}%)`);
    } catch (error) {
        console.error(`    ✗ Erro ao minificar ${inputFile}`);
        // Fallback: copia arquivo original
        fs.copyFileSync(input, output);
    }
}

/**
 * Minifica arquivo JavaScript
 */
function minifyJS(inputFile, outputFile) {
    console.log(`  Minificando JS: ${inputFile}`);

    const input = path.join(config.sourceDir, inputFile);
    const output = path.join(config.outputDir, outputFile);

    // Garante que o diretório de saída existe
    ensureDir(path.dirname(output));

    // Estatísticas
    const originalSize = fs.statSync(input).size;

    try {
        // Usa terser via linha de comando
        execSync(`npx terser "${input}" -o "${output}" --compress --mangle`, { stdio: 'inherit' });

        const minifiedSize = fs.statSync(output).size;

        stats.js.original += originalSize;
        stats.js.minified += minifiedSize;

        console.log(`    ✓ ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${calculateReduction(originalSize, minifiedSize)}%)`);
    } catch (error) {
        console.error(`    ✗ Erro ao minificar ${inputFile}`);
        // Fallback: copia arquivo original
        fs.copyFileSync(input, output);
    }
}

/**
 * Minifica arquivo HTML
 */
function minifyHTML(inputFile, outputFile) {
    console.log(`  Minificando HTML: ${inputFile}`);

    const input = path.join(config.sourceDir, inputFile);
    const output = path.join(config.outputDir, outputFile);

    // Garante que o diretório de saída existe
    ensureDir(path.dirname(output));

    // Estatísticas
    const originalSize = fs.statSync(input).size;

    try {
        // Usa html-minifier via linha de comando
        const cmd = `npx html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true -o "${output}" "${input}"`;
        execSync(cmd, { stdio: 'inherit' });

        const minifiedSize = fs.statSync(output).size;

        stats.html.original += originalSize;
        stats.html.minified += minifiedSize;

        console.log(`    ✓ ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${calculateReduction(originalSize, minifiedSize)}%)`);
    } catch (error) {
        console.error(`    ✗ Erro ao minificar ${inputFile}`);
        // Fallback: copia arquivo original
        fs.copyFileSync(input, output);
    }
}

/**
 * Copia arquivo ou diretório
 */
function copyPath(sourcePath) {
    const source = path.join(config.sourceDir, sourcePath);
    const dest = path.join(config.outputDir, sourcePath);

    if (!fs.existsSync(source)) {
        console.log(`  ⚠ Arquivo não encontrado: ${sourcePath}`);
        return;
    }

    const stat = fs.statSync(source);

    if (stat.isDirectory()) {
        console.log(`  Copiando pasta: ${sourcePath}`);
        copyDirectory(source, dest);
    } else {
        console.log(`  Copiando arquivo: ${sourcePath}`);
        ensureDir(path.dirname(dest));
        fs.copyFileSync(source, dest);
    }
}

/**
 * Copia diretório recursivamente
 */
function copyDirectory(source, dest) {
    ensureDir(dest);

    const files = fs.readdirSync(source);

    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const destPath = path.join(dest, file);

        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
            copyDirectory(sourcePath, destPath);
        } else {
            fs.copyFileSync(sourcePath, destPath);
        }
    });
}

// ============================================
// BUILD PRINCIPAL
// ============================================

function build() {
    console.log('\n🚀 INICIANDO BUILD PARA PRODUÇÃO\n');
    console.log('================================================\n');

    // Limpa/cria diretório dist
    if (fs.existsSync(config.outputDir)) {
        console.log('🗑️  Limpando diretório dist/\n');
        fs.rmSync(config.outputDir, { recursive: true, force: true });
    }
    ensureDir(config.outputDir);

    // Minifica CSS
    console.log('📦 Minificando CSS...\n');
    config.css.forEach(file => {
        minifyCSS(file, file);
    });

    // Minifica JavaScript
    console.log('\n📦 Minificando JavaScript...\n');
    config.js.forEach(file => {
        minifyJS(file, file);
    });

    // Minifica HTML
    console.log('\n📦 Minificando HTML...\n');
    config.html.forEach(file => {
        minifyHTML(file, file);
    });

    // Copia outros arquivos
    console.log('\n📋 Copiando arquivos adicionais...\n');
    config.copy.forEach(file => {
        copyPath(file);
    });

    // Calcula estatísticas totais
    stats.total.original = stats.css.original + stats.js.original + stats.html.original;
    stats.total.minified = stats.css.minified + stats.js.minified + stats.html.minified;

    // Relatório final
    console.log('\n================================================');
    console.log('✅ BUILD CONCLUÍDO COM SUCESSO!\n');
    console.log('📊 ESTATÍSTICAS DE OTIMIZAÇÃO:\n');
    console.log(`CSS:        ${formatBytes(stats.css.original)} → ${formatBytes(stats.css.minified)} (${calculateReduction(stats.css.original, stats.css.minified)}%)`);
    console.log(`JavaScript: ${formatBytes(stats.js.original)} → ${formatBytes(stats.js.minified)} (${calculateReduction(stats.js.original, stats.js.minified)}%)`);
    console.log(`HTML:       ${formatBytes(stats.html.original)} → ${formatBytes(stats.html.minified)} (${calculateReduction(stats.html.original, stats.html.minified)}%)`);
    console.log(`────────────────────────────────────────────────`);
    console.log(`TOTAL:      ${formatBytes(stats.total.original)} → ${formatBytes(stats.total.minified)} (${calculateReduction(stats.total.original, stats.total.minified)}%)`);
    console.log(`ECONOMIA:   ${formatBytes(stats.total.original - stats.total.minified)}`);
    console.log('\n================================================\n');
    console.log(`📁 Arquivos otimizados em: ${config.outputDir}\n`);
}

// ============================================
// EXECUÇÃO
// ============================================

// Verifica se está sendo executado diretamente
if (require.main === module) {
    try {
        build();
    } catch (error) {
        console.error('\n❌ ERRO NO BUILD:', error.message);
        process.exit(1);
    }
}

module.exports = { build };
