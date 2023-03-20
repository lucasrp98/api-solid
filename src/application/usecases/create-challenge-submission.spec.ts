import { CreateChallengeSubmission } from "./create-challenge-submission";
import { InMemoryStudentsRepository } from "../../../tests/in-memory-students-repository";
import { InMemoryChallengesRepository } from "../../../tests/in-memory-challenges-repository";
import { Student } from "../../domain/entities/student";
import { Challenge } from "../../domain/entities/challenge";


describe('Create challenge submission usecase', () => {
    it('should be able to create a new challenge submission', async () => {

        const studentsRepository = new InMemoryStudentsRepository();
        const challengesRepository = new InMemoryChallengesRepository();

        const student = Student.create({
            name: 'Lucas',
            email: 'lucas@email.com',
        })

        const challenge = Challenge.create({
            tittle: 'Challenge 01',
            instructionsUrl: 'https://example.com',
        })

        studentsRepository.items.push(student);
        challengesRepository.items.push(challenge);

        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengesRepository,
        );

        const response = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id,
        })

        expect(response).toBeTruthy()
    });
});