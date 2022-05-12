<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;

class CRUDController extends AbstractController
{
    #[Route('/', name: 'crud')]
    public function index(EntityManagerInterface $em): Response
    {
        $tasks = $em->getRepository(Task::class)->findBy([], ['id' => 'DESC']);
        return $this->render(
            'crud/index.html.twig',
            ['tasks' => $tasks]
        );
    }

    #[Route('/create', name: 'create_task', methods: ['POST'])]
    public function create(Request $request, ManagerRegistry $doctrine): Response
    {
        // return $this->render(
        //     'crud/index.html.twig'
        // );
        // exit('crud to do: create a new task');
        // validation
        $title = trim($request->get('title'));
        $entityManager = $doctrine->getManager();
        $task  = new Task();
        $task->setTitle($title);
        $entityManager->persist($task); // preparing for saving in db
        $entityManager->flush(); //saving is done by this line, insert in db

        if (empty($title))
            return $this->redirectToRoute('crud');

        // exit($request->get('title'));
        return new Response('Save new todo');
    }

    // update
    #[Route('/update/{id}', name: 'update_task')]
    public function update($id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        /* repository help fetch entities of a certain class */
        $task = $entityManager->getRepository(Task::class)->find($id);
        $task->setStatus(!$task->getStatus());
        $entityManager->flush();
        return $this->redirectToRoute('crud');
        // return $this->render(
        //     'crud/index.html.twig'
        // );
        // exit('crud update: update a new task' . $id);
    }

    // delete

    #[Route('/delete/{id}', name: 'delete_task')]
    public function delete($id, ManagerRegistry $doctrine): Response
    {
        // return $this->render(
        //     'crud/index.html.twig'
        // );
        $entityManager = $doctrine->getManager();
        $task = $entityManager->getRepository(Task::class)->find($id);
        $entityManager->remove($task);
        $entityManager->flush();
        return $this->redirectToRoute('crud');
        // exit('crud delete: delete a task' . $id);
    }
}
