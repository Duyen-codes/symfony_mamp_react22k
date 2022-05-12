<?php

namespace App\Controller;

use App\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TodoController extends AbstractController
{
    #[Route('/', name: 'todo')]
    public function index(EntityManagerInterface $em): Response
    {
        $tasks = $em->getRepository(Task::class)->findBy([], ['id' => 'DESC']);
        return $this->render(
            'index.html.twig',
            ['tasks' => $tasks]
        );
    }

    #[Route('/create', name: 'create_task', methods: ['POST'])]
    public function create(Request $request, ManagerRegistry $doctrine): Response
    {
        $name = trim($request->get('title'));
        $entityManager = $doctrine->getManager();
        $task  = new Task();
        $task->setName($name);
        $entityManager->persist($task);
        $entityManager->flush();
        return $this->redirectToRoute('todo');
    }

    // update
    #[Route('/update/{id}', name: 'update_task')]
    public function update($id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $task = $entityManager->getRepository(Task::class)->find($id);
        $task->setStatus(!$task->getStatus());
        $entityManager->flush();
        return $this->redirectToRoute('todo');
    }

    // delete

    #[Route('/delete/{id}', name: 'delete_task')]
    public function delete($id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $task = $entityManager->getRepository(Task::class)->find($id);
        $entityManager->remove($task);
        $entityManager->flush();
        return $this->redirectToRoute('todo');
        // exit('crud delete: delete a task' . $id);
    }

    // important
    #[Route('/star/{id}', name: 'star_task')]
    public function important($id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $task = $entityManager->getRepository(Task::class)->find($id);
        $task->setImportant(!$task->isImportant());
        $entityManager->flush();
        return $this->redirectToRoute('todo');
    }
}
