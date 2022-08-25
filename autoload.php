<?php


declare(strict_types=1);


function simplecache_register()
{
    spl_autoload_register('simplecache_autoload', true, false);
}


function simplecache_autoload($className)
{
    $prefix = 'Shieldon\\SimpleCache\\';
    $dir = __DIR__ . '/src/SimpleCache';

    if (0 === strpos($className, $prefix)) {
        $parts = explode('\\', substr($className, strlen($prefix)));
        $filepath = $dir . '/' . implode('/', $parts) . '.php';

        if (is_file($filepath)) {
            require $filepath;
        }
    }
}

simplecache_register();
