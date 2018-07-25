import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TimePipe } from './time.pipe';


@Component({
    template: `<span id='test-span'>The time is {{ testTimeSpan | time: 'HH:mm' }}.</span>`
})
class TestTimePipeComponent {
    public testTimeSpan = '16:59:59';
}


describe('TimePipe',
    () => {
        let pipe: TimePipe;
        const defaultTimeFormat = 'HH:mm';

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TimePipe,
                    TestTimePipeComponent
                ],
                providers: [
                    TimePipe
                ]
            });

            pipe = TestBed.get(TimePipe);
        });

        it('should be created', () => {
            expect(pipe).toBeTruthy();
        });

        it('should be implemented correctly', () => {
            const implementationFixture = TestBed.createComponent(TestTimePipeComponent);
            const spanElement: DebugElement = implementationFixture.debugElement.query(By.css('#test-span'));
            implementationFixture.detectChanges();

            expect(spanElement.nativeElement.innerText).toBe('The time is 16:59.');
        });

        it('should return formatted time, when value is long time string', () => {
            const input = '10:30:15';
            const expected = '10:30';
            const actual = pipe.transform(input, defaultTimeFormat);
            expect(expected === actual);
        });

        it('should return formatted time, when value is short time string', () => {
            const input = '10:30';
            const expected = '10:30';
            const actual = pipe.transform(input, defaultTimeFormat);
            expect(expected === actual);
        });

        it('should return formatted time, when value is date string', () => {
            const input = '2018-01-01 10:30';
            const expected = '10:30';
            const actual = pipe.transform(input, defaultTimeFormat);
            expect(expected === actual);
        });

        it('should return formatted time, when value is a datetime', () => {
            const input = Date.parse('2018-01-01 10:30');
            const expected = '10:30';
            const actual = pipe.transform(input, defaultTimeFormat);
            expect(expected === actual);
        });

        it('should return input if not a date or time', () => {
            const input = 'This is not a date';
            const expected = input;
            const actual = pipe.transform(input, defaultTimeFormat);
            expect(expected === actual);
        });

    });