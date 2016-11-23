<?php
/**
 * Description :
 *
 *
 */

namespace App\Console\Podio;


use Wau\Console\Podio\PodioCommandAbstract;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class appGetItems extends PodioCommandAbstract
{
    protected function configure() {
        $this->setName('appGetItems')
            ->setDescription('Get ALL App items')
            ->addArgument('app_id', InputArgument::REQUIRED, 'AppId');
    }

    protected function execute(InputInterface $input, OutputInterface $output) {

        $limit = 500;
        $storage = [];
        $incre = 0;
        $offset = 0;

        do {
            $items = \PodioItem::filter((Int)$input->getArgument('app_id'), array('limit' => $limit, 'offset' => $offset, 'sort_by' => 'created_on'));

            foreach ($items as $item) {
                $incre++;
                $output->writeln("<info>processed {$incre} items...</info>");
                $storage [] = $item;
            }

            //increase for next heap
            $offset += $limit;
            $output->writeln("<info>Total so far {$items->total} and offset {$offset}</info>");

        } while ($items->total > $offset);

    }
}